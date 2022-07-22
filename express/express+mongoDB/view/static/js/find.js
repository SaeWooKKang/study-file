const findPw = () => {
  if (!$('#email').val()) {

    alert ('이메일을 입력해주세요.');
    $('#email').focus();

    return ;
  }
  
  let findForm = $('#findForm').serialize();

   // 비동기 요청
   $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/user/find/password',
    data: findForm,
    success: res => {
      
    },
    error: res => {
      alert(res.fail);
    }
  });
}