/*Step 1 : Designing The Store. For the bug tracking application we need to decide what we want to keep
    in the store. To do that we need to design the state. We need to maintain the list of bugs for this example. For 
    this simple app we can have an array with objects which store multiple properties. 
*/

/* The Store:
    [
        {
            id: 1, <--- the id of the bug
            description: "", <-- what kind of bug it is
            resolved: false, <-- status of the bug
        }
    ] 
*/

/* Step 2: Define the actions. Here we need to ask ourselves what sort of actions can our users do in our application. For the 
    simple bug tracking application we can: Add a bug, mark as resolved, and delete a bug. Actions in redux are just POJOs (plain javascript objects)
    that describes what just happened. The only property that redux cares about in our object is 'type' which as the name suggests describes the type of 
    action. An example would be: { type: 'bugAdded'}.

    convention influenced by facebook suggests we should store any property defining the action under a 'payload' object. 
    ex:
        {
            type: 'bugAdded',
            payload: {
                id: 1
            }
        }
    in the payload we can define multiple properties describing our action but for this simple application we will store the minimal amount to understand
    the concept. 
*/

/* Step 3: creating the reducer. The reducers job is to return a new state based on the action. */

let lastId = 0;

export default function reducer(state = [], action) {   //We need to set the state as an empty array otherwise the state will be initialized as undefined
	if (action.type === 'bugAdded') {
		return [
			...state,
			{
				id: ++lastId,
				description: action.payload.description,
				resolved: false,
			},
		];
	} else if (action.type === 'bugRemoved') {
		// Here we need to return an array of bugs that do not include the id of the removed bug
		return state.filter((bug) => bug.id !== action.payload.id);
	}

	return state;
}
