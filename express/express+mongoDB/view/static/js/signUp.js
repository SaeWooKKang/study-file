const signUp = () => {

  const EMAIL = '#email';
  const PASSWORD = '#password';
  const RE_PASSWORD = '#rePassword';
  const NAME = '#name'
  const SIGN_UP_FORM = '#signUpForm';

  const types = [
    {id: EMAIL, alertMessage:  '이메일을 입력해주세요.'},
    {id: PASSWORD, alertMessage:  '비밀버호를 입력해주세요.'},
    {id: RE_PASSWORD, alertMessage:  '비밀번호 확인을 입력해주세요.'},
    {id: NAME, alertMessage:  '이름을 입력해주세요.'},
  ];

  const textNodeClear = idArr => {

    for (const id of idArr) {
      $(id).val('');
    }
  }

  // 입력 확인
  for (let type of types) {

    if (!$(type.id).val()) {

      alert (type.alertMessage);
      $(type.id).focus();
  
      return ;
    } 
  }

  // 비밀번호 일치 확인
  if ($(PASSWORD).val() !== $(RE_PASSWORD).val()) {
    alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');

    $(PASSWORD).val('');
    $(RE_PASSWORD).val('');
    $(PASSWORD).focus();
    
    return;
  }

  let signUpData = $(SIGN_UP_FORM).serialize();

  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/user/signUp',
    data: signUpData,
    success: res => {
      alert(res.result);
      
      location.href = '/view/user/login.html';
    },
    error: err => {
      alert(err.responseJSON.error);

      textNodeClear([
        EMAIL,
        PASSWORD,
        RE_PASSWORD,
        NAME,
        EMAIL
      ]);
    
      $(EMAIL).focus();
    }
  });
}