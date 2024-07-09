import React, { useState } from 'react';

import './form.scss';

function Register() {

    const [username , setUsername] = useState("");
    const [password , setPassword] = useState("");

    const signUser = (event) => {
        event.preventDefault()
        
        if(username !== "" && password !== ""){

            fetch('https://668b3e9e0b61b8d23b08d551.mockapi.io/api/users' , {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({
                    username : username,
                    password : password
                })
            })
            .then(response => response.json())
            .then(output => console.log(output))

        }else{
            console.error('Please Fill in the form')
        }
    }
    
  return (
    <section className='form-container'>
        <form>
            <label htmlFor="username"> Username </label>
            <input type="text" name='username' placeholder='john_loti' value={username} onInput={(input) => setUsername(input.target.value)} />

            <label htmlFor="password"> Password </label>
            <input type="text" name='password' placeholder='183#@Losu_&' value={password} onInput={(input) => setPassword(input.target.value)} />

            <button type='submit' onClick={signUser}> Submit </button>
        </form>
    </section>
  )
}

export default Register