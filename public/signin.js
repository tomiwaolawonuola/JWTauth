

//handle errors 
  const nameError = document.querySelector('.error.name')
  const emailError = document.querySelector('.error.email')
  const passwordError = document.querySelector('.error.password')
 

//HANDLE SIGNIN
const  signinForm = document.getElementById('signin-form');
     //handle error
     
    signinForm.addEventListener('submit', function(e){
        e.preventDefault();
          //clear Error
        nameError.textContent = ''
        emailError.textContent = ''
        passwordError.textContent = ''

        //get values 
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        //handle post request
        const postNewUser =  async ()=>{
           
          try {
            const res = await fetch('/signin/post', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ name, email, password })
            })
            const data = await res.json()
            console.log(data)
            if(data.errors){
              const { email, password } = data.errors
              console.log(email, password)
               emailError.textContent = email
               passwordError.textContent = password
            }
            if(data.user){
              //clear fields
            //  location.assign('/')
            window.location.href = '/'
              //show success message
            }
            // else{
            //   window.alert('User created successfully')
            // }
          } catch (error) {
            console.log(error);
          }
        } 
          
        postNewUser()
        //clear input

      })

