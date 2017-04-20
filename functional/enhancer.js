function doNothingWith(reducer) {
	return function(state, action) {
		return reducer(state, action);
	}
}

function combineReducers(reducers) {
	return function(state = {}, action) {
		var reducerKeys = Object.keys(reducers);
		return reducerKeys.reduce(function(nextState, key) {
			nextState[key] = reducers[key](state[key], action);
			return nextState;
		}, {})
	}
}

function undoable(reducer) {
	const initState = {
		past: [],
		present: reducer(null, {}),
		future: []
	}

	return function(state = {}, action) {
		const { past, present, future } = state;

		switch(action.type) {
			case 'UNDO':
				const newPresent = past[past.length - 1];
				const newPast = past.slice(0, past.length - 1);
				return {
					past: newPast,
					present: newPresent,
					future: [present, ...future]
				}
			case 'REDO':
				const newPresent = future[0];
				const newFuture = future.slice(1);
				return {
					past: [...past, present],
					present: newPresent,
					future: newFuture
				}
			default:
				const newPresent = reducer(state, action); // handle over to origin reducer
				if(present === newPresent) {
					return state;
				}
				return {
					past: [past, present],
					present: newPresent,
					future: []
				}
		}
	}
}

import { createSelector } from 'reselect'

const getVisibilityFilter = state => state.visibilityFilter
const getTodos = state => state.todos
const getKeyword = state => state.keyword

export const getVisibleTodos = createSelector(
	[ getVisibilityFilter, getTodos ],
	(visibilityFilter, todos) => {
		switch(visibilityFilter){
			case 'SHOW_ALL':
				return todos
			case 'SHOW_COMPLETED':
				return todos.filter(todo => todo.completed)
			case 'SHOW_ACTIVE':
				return todos.filter(todo => !todo.completed)
		}
	}
)

export const getVisibleTodosByKeyword = createSelector(
	[ getVisibleTodos, getKeyword ],
	(visibleTodos, keyword) => visibleTodos.filter( todo => todo.indexOf(keyword) > -1)
)

const mapStateToProps = (state, props) => {
	return {
		todos: getVisibleTodos(state, props)
	}
}