const setPassword = () => {
   // 유효성 검사
   if (!$('#password').val()) {

    alert('비밀번호를 입력해주세요.');
    $('#password').focus();

    return;
  } else if (!$('#rePassword').val()) {

    alert('비밀번호 확인을 입력해주세요.');
    $('#rePassword').focus();

    return;
  }

  if ($('#password').val() !== $('#rePassword').val()) {
    alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');

    $('#password').val('');
    $('#rePassword').val('');
    $('#password').focus();
    
    return;
  }

  let setPasswordData = $('#setPasswordForm').serialize();
  setPasswordData +='&email=' + sessionStorage.getItem('email');

  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/user/change/password',
    data: setPasswordData,
    success: res => {
      alert(res.result);
      location.href = '/view/user/login.html';
    },
    error: () => {

    }
  })
}