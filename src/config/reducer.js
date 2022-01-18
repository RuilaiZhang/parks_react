const stateReducer = (state, action) => {
  switch (action.type) {
    case "setParkPosts": {
      return {
        ...state,
        parkPosts: action.data,
      };
    }
    case "addParkPosts": {
      // do some validation on action.data (the new project)
      if (action.data.length > 0) {
        return {
          ...state,
          parkPosts: [action.data, ...state.projects],
        };
      } else {
        return state;
      }
    }
    /* toggle park post open and closed... is this needed?
    case 'toggleParkPosts':{
      return {
        ...state,
        parkPosts: state.parkPosts === true ? true : false
      }
    } */
    case "setLoading": {
      return {
        ...state,
        loading: action.data,
      };
    }
    case "setPark": {
      return {
        ...state,
        parks: action.data,
      };
    }
    case "setPost": {
      return {
        ...state,
        posts: action.data,
      };
    }
    case "setPosts": {
      return {
        ...state,
        posts: action.data,
      };
    }
    case "setCategories": {
      return {
        ...state,
        categories: action.data,
      };
    }

    case "setFeatures": {
      return {
        ...state,
        features: action.data,
      };
    }

    case "setAddresses": {
      return {
        ...state,
        addresses: action.data,
      };
    } 
    case "setSignedInUser": {
      return {
        ...state,
        signedInUser: action.data,
      };
    }
    case "removeSignedInUser": {
      return {
        ...state,
        signedInUser: null,
      };
    }
    case "setJWT": {
      // when I set the jwt, I also want to call on the session storage
      sessionStorage.setItem("jwt", action.data);
      return {
        ...state,
        jwt: action.data,
      };
    }
    case "removeJWT": {
      sessionStorage.removeItem("jwt", action.data);
      return {
        ...state,
        jwt: null,
      };
    }
    default:
      return state;
  }
};
export default stateReducer;
