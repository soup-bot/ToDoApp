<script setup>
import {ref, onMounted} from 'vue'
import { db} from './firebase/index.js'
import { collection, onSnapshot, 
  addDoc, deleteDoc, doc, updateDoc, 
  query, orderBy, limit } from "firebase/firestore";

const todosCollectionRef = collection(db, "todos");
const todosCollectionQuery = query(todosCollectionRef, orderBy("date", "desc"));

const todos = ref([
])
onMounted(() => {
  onSnapshot(todosCollectionQuery, (querySnapshot) => {
  const firebaseData = [];
  querySnapshot.forEach((doc) => {
    const todo = {
      id: doc.id,
      text: doc.data().text,
      done: doc.data().done
    }
    firebaseData.push(todo)
  });
  todos.value = firebaseData;
});

});

const newToDoText = ref('');
const addTodo = () => {

addDoc(todosCollectionRef, {
 text: newToDoText.value,
 done: false,
 date: Date.now()
});

  newToDoText.value = "";
}
const deleteToDo = id => {
  deleteDoc(doc(todosCollectionRef, id));
}
const toggleDone = id => {
  const index = todos.value.findIndex(todo => todo.id === id)
updateDoc( doc(todosCollectionRef, id), {
  done: !todos.value[index].done
});

}

</script>

<template>
  <body>
    
 
  <div class="container">
    <h1>To Do</h1>
<div class="input-container">
  <input v-model="newToDoText" type="text" class="input">
  <button class="add-btn" :disabled="!newToDoText"
  @click="addTodo" href="">+</button>
</div>
<div 
:class="todo.done ? 'todo-done':'todo-notdone'"
v-for="todo in todos" class="card">
  <!-- <p class="card-text">{{ todo.text }}</p> -->
  <div class="card-text">{{ todo.text }}</div>
  <div class="buttons-container">
    <button @click="toggleDone(todo.id)"
    class="button check">&check;</button>
  <button @click="deleteToDo(todo.id)"
  class="button delete">&cross;</button>
  </div>
</div>

  </div>
</body>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
*{
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  font-family: 'Roboto', sans-serif;
}
h1{
  font-weight: bold;
  font-size: 40px;
  color: white;
}
.card{
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.19);
  
}
.check{
  
  background-color: rgb(0, 164, 0);
  
}
.delete{
  background-color: rgb(154, 0, 0);
  color: white;
  
}
.card-text{
 margin: 10px;
  flex-grow: 1;
  word-wrap: break-word;
  display: flex;
 align-items: center;
 font-size: 16px;
word-break: break-all;
color: white;
  
}
.input-container{
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
 margin: 15px 0;
 
}
.add-btn{
  width: 40px;
  height: 40px;
  color: white;
  font-size: 25px;
  border-radius: 3px;
  background: rgb(63,94,251);
background: radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(146,70,252,1) 100%); 

}
.button{
  color: white;
  padding: 3px;
  margin: 0px 5px;
  border-style: none;
  font-size: 20px;
  font-weight: bold;
  width: 40px;
  height: 40px;
  border-radius: 15%;
}
.buttons-container{
  display: flex;
  margin-left: 15px;

}
.input{
  border-radius: 5px;
  border-color: rgba(0, 0, 0, 0.188);
  flex-grow: 1;
  height: 40px;
  font-size: 18px;
  padding: 10px;
}
body{
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  /* background: rgb(238,174,202);
background: radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%); */
background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1402%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='url(%26quot%3b%23SvgjsLinearGradient1403%26quot%3b)'%3e%3c/rect%3e%3cpath d='M1052.0927308521248 254.31133913806565L1136.5904708010778 223.5566769338805 1105.8358085968925 139.05893698492747 1021.3380686479396 169.8135991891126z' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M1479.6672973227767 108.78885657291403L1413.203660550385 53.01924347049938 1423.897684220362 175.2524933453058z' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M358.93921769050405 492.54995786779557L342.47311079027173 577.2607342487821 427.1838871712583 593.7268411490144 443.6499940714906 509.0160647680279z' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M1329.21%2c341.111C1361.626%2c339.252%2c1385.577%2c313.926%2c1400.962%2c285.333C1415.407%2c258.487%2c1418.738%2c227.358%2c1405.081%2c200.103C1389.8%2c169.605%2c1363.315%2c141.467%2c1329.21%2c142.136C1295.841%2c142.791%2c1274.961%2c174.049%2c1258.327%2c202.983C1241.767%2c231.787%2c1226.463%2c264.91%2c1241.632%2c294.47C1257.817%2c326.009%2c1293.819%2c343.141%2c1329.21%2c341.111' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M1214.125%2c289.372C1233.248%2c290.512%2c1252.261%2c281.636%2c1261.938%2c265.103C1271.704%2c248.417%2c1270.38%2c227.322%2c1259.984%2c211.021C1250.303%2c195.842%2c1232.091%2c188.978%2c1214.125%2c190.135C1198.061%2c191.169%2c1185.3%2c202.271%2c1177.469%2c216.335C1169.881%2c229.963%2c1168.262%2c245.996%2c1175.259%2c259.937C1183.072%2c275.504%2c1196.738%2c288.336%2c1214.125%2c289.372' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float2'%3e%3c/path%3e%3cpath d='M1183.0173279157355 160.65890046003585L1112.499351905963 305.2421775732689 1257.082629019196 375.7601535830414 1327.6006050289686 231.1768764698083z' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M412.4076300600824 208.0433135206494L429.6405573258332 110.31052641960268 331.9077702247865 93.07759915385189 314.6748429590357 190.81038625489862z' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M270.06182133232255 213.61300298817778L181.6960129816296 166.62806925172373 223.07688759586847 301.97881133887074z' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float2'%3e%3c/path%3e%3cpath d='M843.9867849632886 523.7544013109444L897.0323383182715 612.037027389572 985.3149643968991 558.9914740345891 932.2694110419162 470.7088479559616z' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M187.748%2c377.851C232.147%2c378.877%2c280.4%2c369.775%2c303.141%2c331.628C326.282%2c292.809%2c314.893%2c243.714%2c290.326%2c205.782C267.962%2c171.252%2c228.855%2c155.098%2c187.748%2c153.459C142.917%2c151.672%2c93.47%2c158.787%2c69.952%2c196.996C45.608%2c236.546%2c55.891%2c287.584%2c81.238%2c326.499C104.293%2c361.897%2c145.515%2c376.875%2c187.748%2c377.851' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M40.855749040196116 461.5521127947171L-42.50145078630868 476.2502361604369-27.8033274205889 559.6074359869417 55.5538724059159 544.9093126212219z' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float2'%3e%3c/path%3e%3cpath d='M1446.335%2c627.242C1500.14%2c623.916%2c1538.739%2c580.636%2c1564.328%2c533.189C1588.366%2c488.619%2c1598.199%2c435.857%2c1573.349%2c391.735C1548.087%2c346.881%2c1497.778%2c325.615%2c1446.335%2c323.689C1390.718%2c321.606%2c1331.96%2c334.85%2c1301.702%2c381.562C1269.076%2c431.929%2c1269.6%2c497.811%2c1300.045%2c549.526C1330.069%2c600.527%2c1387.266%2c630.894%2c1446.335%2c627.242' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float2'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1402'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3clinearGradient x1='84.72%25' y1='139.29%25' x2='15.28%25' y2='-39.29%25' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient1403'%3e%3cstop stop-color='rgba(94%2c 5%2c 231%2c 1)' offset='0'%3e%3c/stop%3e%3cstop stop-color='rgba(157%2c 5%2c 231%2c 1)' offset='1'%3e%3c/stop%3e%3c/linearGradient%3e%3cstyle%3e %40keyframes float1 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(-10px%2c 0)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float1 %7b animation: float1 5s infinite%3b %7d %40keyframes float2 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(-5px%2c -5px)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float2 %7b animation: float2 4s infinite%3b %7d %40keyframes float3 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(0%2c -10px)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float3 %7b animation: float3 6s infinite%3b %7d %3c/style%3e%3c/defs%3e%3c/svg%3e");
background-size: cover;
background-repeat: repeat;
}
.card{
  border: 1px solid;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin: 10px;

}
.todo-done{
  background-color: greenyellow;
}
.todo-done .card-text{
  text-decoration: line-through;
}
.container{
  padding: 20px 0;
  margin-top: 30px;
  min-height: 600px;
  width: 40%;
  min-width: 400px;
  border: 1px solid;
display: flex;
flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border-radius: 5%;
  border-radius: 30px;
border-radius: 16px;

background: rgba(255, 255, 255, 0.178);
-webkit-backdrop-filter: blur(10px);
backdrop-filter: blur(10px);
border: 1px solid rgba(255,255,255,0.175);

}
</style>
