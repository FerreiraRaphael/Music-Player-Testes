# actions

>    Actions that describe a change in app state with a plain object

    export function action( ACTION_PAYLOAD= {} ){
      return {
          type: ACTION_TYPE
          payload: ACTION_PAYLOAD
      }
    }


**Structure**

actions/
	- action.js
