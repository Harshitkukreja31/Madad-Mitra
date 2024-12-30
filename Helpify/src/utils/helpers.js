export const isUserLoggedIn = () => {
    let loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
    return loggedInUserEmail ? true : false;
};
  
export const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("loggedInUserEmail");
    localStorage.removeItem("userDetails");
    window.location.reload();
};

export const signInHandler = async (event) => {
    event.preventDefault();

    var formValuesObject = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    console.log("The event is: ", event);
    console.log("The form values are  is: ", formValuesObject);

    if (formValuesObject.email && formValuesObject.password) {
      console.log("Submit this form");
      const signInResponse = await fetch("http://localhost:8080/user/signin", {
        method: "POST",
        body: JSON.stringify(formValuesObject),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (signInResponse.ok && signInResponse.status == "200") {
        const signInResponseData = await signInResponse.json();
        localStorage.setItem("authToken", signInResponseData?.token);
        localStorage.setItem("loggedInUserEmail", formValuesObject.email);

        setSignInSuccess(true);
        alert("Signin success");
      } else {
        alert("Signin failed");
      }
      // Make an api/web service call to submit the user details
    } else {
      alert("Form is invalid");
    }
  };

 export const fetchUserDetails = async () => {
    let email = localStorage.getItem("loggedInUserEmail");
    var productsResponse = await fetch(`http://localhost:8080/user/${email}`, {
      headers: {
        Authorization: localStorage.getItem("authToken"),
      },
    });
    var userDetails = await productsResponse.json();

    console.log("The user details are: ", userDetails);
    if (productsResponse.ok && productsResponse.status == "200") {
      localStorage.setItem("userDetails", userDetails);
      window.location.reload();
    } else {
      // setShowFailureAlert(true);
    }
  };

export const signUpHandler = async (event) => {
    event.preventDefault();

    var formValuesObject = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    console.log("The event is: ", event);
    console.log("The form values are  is: ", formValuesObject);

    if (
      formValuesObject.firstName &&
      formValuesObject.lastName &&
      formValuesObject.email &&
      formValuesObject.password
    ) {
      console.log("Submit this form");

      // Make an api/web service call to submit the user details
      var response = await fetch("http://localhost:8080/user", {
        method: "POST",
        body: JSON.stringify({ ...formValuesObject }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (
        response.ok &&
        (response.status == "201" || response.status == "200")
      ) {
        setShowFailureAlert(false);
        setShowSuccessAlert(true);
      } else {
        setShowSuccessAlert(false);
        setShowFailureAlert(true);
      }
      console.log("The response of POST API call is ", response);
    } else {
      setShowFailureAlert(true);
    }
  };

export  const updateFirstName = () => {
    console.log("on change called: ", firstNameRef);
    // let formattedValue = firstNameRef.current.value.toUpperCase();
    // firstNameRef.current.value = formattedValue;
  };