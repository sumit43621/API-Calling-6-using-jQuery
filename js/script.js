let loader = document.querySelector('.s_myloader');

$.ajax({
    url:'https://fakerestapi.azurewebsites.net/api/v1/CoverPhotos',
    type:'GET',
    beforeSend:function(xhr){
        loader.classList.remove('invisible');
    },
    success:function(result,status,xhr){
        loader.classList.add('invisible');
        console.log(result);
        var tr = `<table class="table">
                        <thead>
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">idBook</th>
                            <th scope="col">url</th>
                            <th scope="col">Action</th>
                        </tr>
                        </thead>
                        <tbody>`;
        result.forEach(element => {
            console.log(element);
            tr += `<tr>
                        <td>`+ element.id +`</td>
                        <td>`+ element.idBook +`</td>
                        <td> <a href="`+ element.url +`" target="_blank">Link</a></td>
                        <td>
                            <button class="btn btn-sm btn-success s_myviewbtn" data-bs-toggle="modal" data-bs-target="#exampleModal">View</button>
                            <button class="btn btn-sm btn-info">Edit</button>
                            <button class="btn btn-sm btn-danger s_mydelbtn">Delete</button>
                        </td>
                    </tr>`
        });
        tr += `    </tbody>
                    </table>`;
        document.body.innerHTML += tr;
    },
    error:function(xhr,status,error){

    },
    complete:function(){
        
    }
})

document.addEventListener('click', function(e){
    if(e.target.classList.contains('s_myviewbtn')){
        let id = e.target.closest('tr').querySelector('td:first-child').innerHTML;
        let idBook = e.target.closest('tr').querySelector('td:nth-child(2)').innerHTML;
        let link = e.target.closest('tr').querySelector('td:nth-child(3) > a').getAttribute('href');

        console.log(link);
        let lg = document.querySelector('.s_modal-body > .list-group');

        lg.querySelector("li:first-child").innerHTML = id
        lg.querySelector("li:nth-child(2)").innerHTML = idBook
        lg.querySelector("li:last-child").innerHTML = link
    }

    if(e.target.classList.contains('s_mydelbtn')){
        var delid = e.target.closest('tr').querySelector('td:first-child').innerHTML;
        var tr = e.target.closest('tr')
        console.log(delid);
        $.ajax({
            url: 'https://fakerestapi.azurewebsites.net/api/v1/CoverPhotos/'+delid,
            type: 'DELETE',
            beforeSend:function(){

            },
            success:function(result,status,xhr){
                tr.remove();
            },
            error:function(){

            },
            complete:function(){

            },
        })
    }

})