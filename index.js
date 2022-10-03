

document.addEventListener('DOMContentLoaded', ()=>{
    getMessages()
    postMessages()
    formList()
})

function getMessages(){
    fetch("http://localhost:3000/messages")
    .then(response => response.json())
    .then(data=>{
        data.forEach(element => {
            messages(element)
            
        });
    })
}



function messages(message){
    let data = ''
    data += `<tr>
    <td>
      <div class="d-flex align-items-center">
        <img
            src=${message.image}
            alt=""
            style="width: 45px; height: 45px"
            class="rounded-circle"
            />
        <div class="ms-3">
          <p class="fw-bold mb-1">${message.name}</p>
          <p class="text-muted mb-0">${message.email}dianae@gmail.com</p>
        </div>
      </div>
    </td>
    <td>
      <p class="fw-normal mb-1">${message.classroom}</p>
    </td>
    <td>
      <span class="badge badge-success rounded-pill d-inline">${message.status}</span>
    </td>
    
  </tr>`
    document.getElementById('dms').innerHTML+=data
}

function postMessages(){
    const form =document.getElementById('form')
    form.addEventListener('submit',e=>{
        e.preventDefault()
        const name = form.name.value
        const email = form.email.value
        const classroom = form.classroom.value
        const status = form.status.value
        const image = form.image.value
        fetch("http://localhost:3000/messages",{
        method:"POST",
        headers:{
            'content-type': 'application/json'
            
        },
        body:JSON.stringify({
            name:name,
            email:email,
            classroom:classroom,
            status:status,
            image:image
        

        })
    }).then(response=>response.json())
    .then(data=>{
        messages(data)
        handleAlert()
    })
    })
    
        
 }
 function handleAlert(){
    alert("You have submited your form successfully")
 }

 function handleDelete(post){
    fetch("http://localhost:3000/messages",{
        method:"DELETE"
    })
    .then(response=>response.json())
    .then(item=>window.location.reload())

 }

 function formList(){
    const btn= document.getElementById('toogle')
    const form = document.getElementById('logs')
    btn.addEventListener('click',()=>{
        
        if (form.className=='form'){
            form.className=''
            btn.innerHTML='Hide Form'
        }
        else if(form.className==''){
            form.className='form'
            btn.innerHTML='Show Form'
        }
        
    })
 }