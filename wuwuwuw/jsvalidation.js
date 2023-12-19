const validation = new JustValidate("#signup");

validation
    .addField("#name",[
        {
            rule: "requred"
        }
    ])
    .addField("#email",[
        {
            rule: "required"
        },
        {
            rule: "email"
        },
        {
            validation: (value) => ()=>{
                return fetch("validateemail.php="+ encodeURIComponent(value))
                .then(function(response){
                    return response.json();
                })
                .then(function(json){
                    return json.available;
                });
            },
            errorMessage: "email already taken"
        }
    ])
    .addField("#password",[
        {
            rule: "password"
        }
    ])
    .addField("#password_confirmation", [
        {
            validator: (value, fields)=>{
                return value === fields["#password"].elem.value;
            },
            errorMessage: "Passwords should match"
        }
    ])
    .onSuccess((event) =>{
        document.getElementById("signup").onsubmit();
    });