import { createReducer } from "@ngrx/store";
import { LoginState } from "./LoginState";

const initialState: LoginState = {
    error: null,
    isLoggedIn: false,
    isLoggingIn: false
}

const reducer = createReducer(initialState)

export function loginReducer(state: LoginState, action) {
    return reducer(state, action);
}