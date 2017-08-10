import R from "ramda";
export default {
     namespace:"todos",
     state:{"todos":[]},
     reducers:{
         init_sync(state,{data}){
             return R.set(R.lensProp("todos"),data,state);
         },
         add_sync(state,{data}){
             return R.set(
                 R.lensProp("todos"),
                 R.append(data,state.todos),
                 state
             );
         },
         del_sync(state,{id}){
             return R.set(
                R.lensProp("todos"),
                state.todos.filter((item)=>{
                     return item.id != id;
                }),
                state
             );
         },
         changetitle_sync(state,{id,title}){
             return R.set(
                R.lensProp("todos"),
                state.todos.map((item)=>{
                     if(item.id==id)
                        return {
                             ...item,
                             "title":title
                        }
                     return item;
                }),
                state
             )
         },
         changedone_sync(state,{id,done}){
             return R.set(
                R.lensProp("todos"),
                state.todos.map((item)=>{
                     if(item.id==id)
                        return {
                             ...item,
                             "done":done?1:0
                        }
                     return item;
                }),
                state
             )
         }
     },
     effects:{
         init: function * (action,{put}){
            const data = yield fetch("/todos").then((data)=>{
                 return data.json();
            })
              yield put({"type":"init_sync",data})
         },
         add: function * ({title},{put}){
             const data = yield fetch("/todos",{
                 "method":"POST",
                 "headers":{
                     "Content-Type":"application/json"
                 },
                 body:JSON.stringify({"title":title,"done":0})
             }).then((data)=>{return data.json()});
             yield put({"type":"add_sync",data});
         },
         del:function *({id},{put}){
              const data = yield fetch("/todos/"+id,{
                 "method":"DELETE",
                 "headers":{
                     "Content-Type":"application/json"
                 }
              });
              yield put({"type":"del_sync",id});
         },
         changetitle:function *({id,title},{put}){
              const data = yield fetch("/todos/"+id,{
                  method:"PATCH",
                  "headers":{
                     "Content-Type":"application/json"
                 },
                 body:JSON.stringify({"title":title})
              }).then((data)=>{return data.json()})
              yield put({"type":"changetitle_sync",id,title});
         } ,
           changedone:function *({id,done},{put}){
              const data = yield fetch("/todos/"+id,{
                  method:"PATCH",
                  "headers":{
                     "Content-Type":"application/json"
                 },
                 body:JSON.stringify({"done":done?1:0})
              }).then((data)=>{return data.json()})
              yield put({"type":"changedone_sync",id,done});
         }
     }
}