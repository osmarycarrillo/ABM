 $.ajax('http://localhost:3000/api/consulta')
     .done(function(data){
         for(let i= 0; i < data.length; i++){
             $('.table').append(`
             <tr id="user-${data[i].id}">
                <td>${data[i].name}</td>
                <td>${data[i].surname}</td>
                <td>${data[i].phone}</td>
                <td>${data[i].mail}</td>
                <td><a href ="/editar?id=${data[i].id}"><i class="fas fa-pencil-alt edit" ></i></a></td>
                <td>
                <i class="fas fa-trash-alt" onclick="eliminar(${data[i].id})"></i>
                </td>
             </tr>
            `)
        }  
    })

// $(document).on('click', 'remove', function (){
//      const id = $(this).parent().data('id');
//      $ajax(`http://localhost:3000/api/consulta/${id}`, {method: 'delete'});
//      $(this).parent().remove;
//  })

function eliminar (id) {
    
    $.ajax('http://localhost:3000/api/consulta/' + id, {
       
        method: 'DELETE',
        success: function(){
            $('#user-' + id).remove();
            alert("Eliminado");
        }
    })
}


//buscar
$('.btn-search').on('click', function () {
    const filtro = $('#buscar').val();
    $.ajax('http://localhost:3000/api/consulta?search=' + filtro)
    .done( function (data) {
        $('.table tr td').remove();
        for (var i = 0; i < data.length; i++){
            $('.table').append(`
            <tr id="user-${data[i].id}">
                <td>${data[i].name}</td>
                <td>${data[i].surname}</td>
                <td>${data[i].phone}</td>
                <td>${data[i].mail}</td>
                <td><a href ="/editar?id=${data[i].id}"><i class="fas fa-pencil-alt edit" ></i></a></td>
                <td>
                <i class="fas fa-trash-alt" onclick="eliminar(${data[i].id})"></i>
                </td>
             </tr>
         `);
        }
    })
 })
