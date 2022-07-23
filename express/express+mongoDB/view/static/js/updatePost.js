let shortId;

// 서버에서 해당 데이터 받아서 form 채움
$(document).ready(() => {
  shortId = localStorage.getItem("shortId");

  $.ajax({
    type: 'GET',
    url: `http://localhost:3000/posts/${ shortId }/find`,
    headers: {
      accessToken: $.cookie('accessToken')
    },
    success: (res) => {
      $('#title').val(res.title);
      $('#content').val(res.content);
    }
  });
});

const updatePost = () => {
   // 유효성 검사
   if (!$('#title').val()) {

    alert('제목을 입력해주세요.');
    $('#title').focus();

    return;
  } else if (!$('#content').val()) {

    alert('내용을 입력해주세요.');
    $('#content').focus();

    return;
  }

  let formData = $('#updateForm').serialize();
  
  $.ajax({
    type: 'POST',
    url: `http://localhost:3000/posts/${ shortId }/update`,
    data: formData,
    headers: {
      accessToken: $.cookie('accessToken')
    },
    success: res => {
      alert(res.result);
      
      // 리다이렉트
      location.href = '/view/posts/list.html';

      return;
    }
  });
}

const backPost = () => {
  location.href = '/view/posts/list.html';
};