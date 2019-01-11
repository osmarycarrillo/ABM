const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

 $.ajax('http://localhost:3000/api/editar/' + id)
 
     .done(function (data){
        $('#nombreEditar').val(data.name);
 		$('#surname').val(data.surname);
 		$('#phone').val(data.phone);
        $('#mail').val(data.mail);
        
 })

 $('.editar').on('click', function () {
    $.ajax('http://localhost:3000/api/editar/' + id, {
        method: "PUT",
        data: {
            name: $('#name').val(),
            surname: $('#surname').val(),
            phone: $('#phone').val(),
            mail: $('#mail').val()
        },
        success: function () {
            location.href = "/consulta";
            alert("Modificado");
        }
    })
})




