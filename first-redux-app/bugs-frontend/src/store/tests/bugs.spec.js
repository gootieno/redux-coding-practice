import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { addBug, loadBugs, resolveBug, getUnresolvedBugs } from '../bugs';
import configureStore from '../configureStore';

describe('bugsSlice', () => {
	let fakeAxios;
	let store;

	beforeEach(() => {
		fakeAxios = new MockAdapter(axios);
		store = configureStore();
	});

	const bugsSlice = () => store.getState().entities.bugs;
	const createState = () => ({
		entities: {
			bugs: {
				list: [],
			},
		},
	});

	describe('loading bugs', () => {
		describe('if the bugs dont exist in the cache', () => {
			it('they should be fetched from the server and put in the store', async () => {
				fakeAxios.onGet('/bugs').reply(200, [{ id: 1 }]);

				await store.dispatch(loadBugs());
				expect(bugsSlice().list).toHaveLength(1);
			});

			describe('if bugs exist in the cache', () => {
				it('they should not be fetched from the server again', async () => {
					fakeAxios.onGet('/bugs').reply(200, [{ id: 1 }]);
					fakeAxios.onGet('/bugs').reply(200, [{ id: 1 }]);

					await store.dispatch(loadBugs());
					await store.dispatch(loadBugs());

					expect(fakeAxios.history.get.length).toBe(1);
				});

				describe('loading indicator', () => {
					it('should be true while fetching bugs from server', () => {
						fakeAxios.onGet('/bugs').reply(() => {
							expect(bugsSlice().loading).toBe(true);
							return [200, [{ id: 1 }]];
						});
						store.dispatch(loadBugs());
					});

					it('should be false after fetching bugs from server', async () => {
						fakeAxios.onGet('/bugs').reply(200, [{ id: 1 }]);
						await store.dispatch(loadBugs());

						expect(bugsSlice().loading).toBe(false);
					});

					it('should be false if server returns with an error', async () => {
						fakeAxios.onGet('/bugs').reply(500);
						await store.dispatch(loadBugs());

						expect(bugsSlice().loading).toBe(false);
					});
				});
			});
		});
	});

	it('should add the bug to the store if its saved to the server', async () => {
		//Arrange
		const bug = { description: 'a' };
		const savedBug = { ...bug, id: 1 };
		fakeAxios.onPost('/bugs').reply(200, savedBug);
		//Act
		await store.dispatch(addBug(bug));
		//Assert
		expect(bugsSlice().list).toContainEqual(savedBug);
	});

	it('should not add the bug to the store if its not saved to the server', async () => {
		//Arrange
		const bug = { description: 'a' };
		const savedBug = { ...bug, id: 1 };
		fakeAxios.onPost('/bugs').reply(500, savedBug);
		//Act
		await store.dispatch(addBug(bug));
		//Assert
		expect(bugsSlice().list).toHaveLength(0);
	});

	it('shoud mark the bug as resolved if its saved to the server', async () => {
		fakeAxios.onPatch('/bugs/1').reply(200, { id: 1, resolved: true });
		fakeAxios.onPost('/bugs').reply(200, { id: 1 });

		await store.dispatch(addBug({ id: 1 }));
		await store.dispatch(resolveBug(1));

		expect(bugsSlice().list[0].resolved).toBe(true);
	});

	it('shoud not mark the bug as resolved if its not saved to the server', async () => {
		fakeAxios.onPatch('/bugs/1').reply(500);
		fakeAxios.onPost('/bugs').reply(200, { id: 1 });

		await store.dispatch(addBug({ id: 1 }));
		await store.dispatch(resolveBug(1));

		expect(bugsSlice().list[0].resolved).not.toBe(true);
	});

	describe('selectors', () => {
		it('should return a list of unresolved bugs', () => {
			const state = createState();
			state.entities.bugs.list = [
				{ id: 1, resolved: true },
				{ id: 2 },
				{ id: 3 },
			];

			const result = getUnresolvedBugs(state);

			expect(result).toHaveLength(2);
		});
	});
});
