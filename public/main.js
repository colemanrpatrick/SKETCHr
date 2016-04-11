var canvasApp ={
  urls:{
    canvasIMG: '/upload',
    getCanvasImg: '/photo/',
    canvasGallery: '/gallery',
    deleteCanvas: '/photo/',
    createUser: "/create-user/"
  }
};

function addUser(user){
  $.ajax({
    url: canvasApp.urls.createUser,
    method: "POST",
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    data: JSON.stringify(user),
    success: function(data){
      console.log('user added!', data);
    },
    error: function(error){
      console.log("Add User", error);
    }
  });
}

function saveCanvasImg(canvasString){
  $.ajax({
    url:canvasApp.urls.canvasIMG,
    method:'POST',
    data: {canvasIMG:canvasString},
    success: function(canvasIMG){
      // console.log(canvasDATA);
      alert('it worked!');
    }
  });
}

function getGallery(){
  $.ajax({
    url:canvasApp.urls.canvasGallery,
    method:'GET',
    success: function(data){
      console.log('here is my data',data);
      // alert('it worked!');
    }
  });
}

function deleteImg(){
  $.ajax({
    method:'DELETE',
    url: canvasApp.urls.deleteCanvas + id,
    success: function(){
      console.log('deleted!');
    }
  });
}
id = '35';

function getCanvasImg(){
  $.ajax({
    method:'GET',
    url:canvasApp.urls.getCanvasImg + 1,
    success: function(canvasIMG){
      var img = new Image();
      var canvasGet = decodeURIComponent(canvasIMG.fileName).split('=')[1].substr(1);
      console.log('got it 2', canvasGet);
      // console.log('here it is again',canvasGet);
      img.src = decodeURIComponent(canvasGet);
      // console.log('and decoded',img);
      document.body.appendChild(img);
      alert('gotIT!');
    }
  });
}

$('#userForm').submit(function(event){
  event.preventDefault();
  var user= {};
  user.userName = $('input[name="newName"]').val();
  user.passwordHash = $('input[name="newPassword"]').val();
  addUser(user);
  console.log('submitted');
});

document.getElementById('save').addEventListener('click',function(){
  var canvasDATA = canvas.toDataURL(0, 0, context.canvas.width, context.canvas.height);
  var canvasString = JSON.stringify(canvasDATA);
  console.log(canvasString);
  saveCanvasImg(canvasString);
});

document.getElementById('delete').addEventListener('click', function(){
  deleteImg();
});


document.getElementById('open').addEventListener('click', function(){
  getCanvasImg();
  getGallery();
});
