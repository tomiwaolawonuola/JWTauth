

// const clearField = (name, email, password)=>{
//            name.value = ''
//            email.value = ''
//            password.value = ''
// }

//HANDLE SIGNUP
    //error messages
  const nameError = document.querySelector('.error.name')
  const EmailError = document.querySelector('.error.email')
  const passwordError = document.querySelector('.error.password')

      

 const  signupForm = document.getElementById('signup-form');
     //handle error
       //clear Error
        nameError.textContent = ''
        EmailError.textContent = ''
        passwordError.textContent = ''

     
    signupForm.addEventListener('submit', function(e){
        e.preventDefault();
        
        //get values 
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        //handle post request
        const postNewUser =  async ()=>{
           
          try {
            const res = await fetch('/signup/post', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ name, email, password })
            })
            const data = await res.json()
            console.log(data)
            if(data.error){
              if(data.error.name){
                nameError.textContent = data.error.name
              }
              if(data.error.email){
                EmailError.textContent = data.error.email
              }
              if(data.error.password){
                passwordError.textContent = data.error.password
              }
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




      



