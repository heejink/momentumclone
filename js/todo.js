const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LOCALSTORAGE = "toDos";

// toDos는 여러개가 될 수 있으므로, 배열로 받아야함
let toDos = [];

// 삭제버튼을 누르면, html에서 ul속 childnode 삭제 && localstorage에서도 삭제
function deleteToDo(event) {
  // console.dir()로 event.target의 부모노드를 찾았음.
  //console.dir(event.target);
  const btn = event.target;
  // 지워야할 li
  const li = btn.parentNode;
  toDoList.removeChild(li);
  // filter()는 마치 forEach에서 function을 실행하는 것과 같이 각각의 item과 같이 실행된다.
  const cleanToDos = toDos.filter(function(toDo) {
    // 이것은 삭제한것 빼고 나머지를 남긴다는 뜻
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  // saveToDos() 실행시켜 localstorage에 삭제가 반영된 toDo를 저장
  saveToDos();
}

// paintToDo()에서 추가시킨 toDos를 가져와서 localstorage에 저장하기위한 savaToDos()
function saveToDos() {
  // js는 localstorage에 있는 데이터를 string으로 저장함
  // 따라서 우리는 objec인 toDos를 string으로 형변환해야함
  localStorage.setItem(TODOS_LOCALSTORAGE, JSON.stringify(toDos));
}

// 브라우저에서 toDoInput에 할일을 입력
// > 입력받은 handleSubmit()에서 currentValue를 paintToDo()로 보냄
// > paintToDo()에서 text argument로 받아온 할일을 ul.js-toDoList에 추가시킴
// paintToDo() : 할일을 생성 할 때마다, 'toDos' array에 추가시킴
function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  //delBtn.innerHTML = "❌";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  // li에 자식 요소를 추가한다
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;
  // html에 만들어놓은 ul toDoList에 li를 자식요소로 추가한다
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  // toDos array에 toDoObj를 넣음
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(evn) {
  // 이벤트를 취소할 수 있는 경우, 이벤트의 전파를 막지않고 그 이벤트를 취소합니다
  evn.preventDefault();
  // 변수 currentValue에 input에서 받은 todo의 value를 할당
  const currentValue = toDoInput.value;
  // currentValue를 paintToDo function의 text argument로 보낸다

  if (currentValue !== "") {
    paintToDo(currentValue);
    // 입력 후 submit 보내면 input란을 빈칸으로 만들어줌
    toDoInput.value = "";
  } else {
    alert("Write a to do!");
    evn.preventDefault();
  }
}

// paintToDo에서 추가한 할일들을 화면에 load 하기위한 loadToDos()
function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LOCALSTORAGE);
  if (loadedToDos !== null) {
    //console.log(`로컬 스토리지에 저장된 string형 todo들 >>> ${loadedToDos}`);
    // 위의 콘솔로그를 보면 saveToDos에서 string형식의 toDos를 불러온걸 확인할 수 있다.
    // 따라서 JSON을 사용해 js가 데이터를 다를 수 있도록 object로 형변환 해줘야함
    const parsedToDos = JSON.parse(loadedToDos);
    // console.log(`로컬 스토리지에 저장된 object형 todo들 >>> ${parsedToDos}`);
    // 각각의 array index에 paintToDo forEach function이 실행.
    parsedToDos.forEach(function(toDo) {
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
