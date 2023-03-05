import {produce} from "immer";

export const dragReducer=produce((draft,action)=>{
    switch (action.type){
        case 'MOVE':{
            console.log(`Moving '${action.itemId}' from ${action.from} to ${action.to}`)
            draft[action.from] = draft[action.from]||[];
            draft[action.to] = draft[action.to]||[];
            const [removed]=draft[action.from].splice(action.fromIndex,1);
            draft[action.to].splice(action.toIndex,0,removed);
        }
    }
    // return state;
});

