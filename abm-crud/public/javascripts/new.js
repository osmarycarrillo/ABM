$('.crear').on('click', function () {
    //validacion
    const match_only_letters = /^[a-zA-Z áéíóúÁÉÍÓÚñÑ]/;
    const test_phone = /^\d{10}$/;
    const test_mail = /^(([^<>()\[\]\\.,;:\s@“]+(\.[^<>()\[\]\\.,;:\s@“]+)*)|(“.+“))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{13}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;
    //cargo mis valores
    let nombre = $('#name').val();
    let apellido = $ ('#surname').val();
    let tele = $('#phone').val();
    let mail = $('#mail').val();

    if (nombre.length === 0 || nombre.length >= 30 || !match_only_letters.test(nombre) ) {
        $('.error').removeClass('hide');
        setTimeout(function () {
            $('.error').addClass('hide');
 
        },3000);
    }
 
    if(apellido.length === 0 || apellido.length >= 30 || !match_only_letters.test(apellido) ) {
        $('.error').removeClass('hiden');
        setTimeout(function () {
            $('.error').addClass('hide');
 
        },3000);
    }
 
    if( !test_phone.test(tele) ) {
        $('.error').removeClass('hide');
        setTimeout(function () {
            $('.error').addClass('hide');
 
        },3000);
    }
 
    if( !test_mail.test(mail) ){
        $('.error').removeClass('hide');
        setTimeout(function () {
            $('.error').addClass('hide');
 
        },3000);
    }
    //armo mi obj
    var newUser = {
        name: nombre,
        surname: apellido,
        phone: tele,
        mail: mail 
    }
   
    $.ajax('http://localhost:3000/api/nuevo', {
        method: 'POST',
        data: newUser,
        success: function () {
            location.href= '/consulta'
          }
    })
})


