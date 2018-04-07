toDoItem = [];
$(function(){
    // toDoItem = [];
    $("#add").on('click',addToDo);
    $("#selection").on('click',selectToDo);
    $("#clear").attr({"data-toggle" : "modal","data-target" : "#myModal","data-passed":"c"});
});



function onFormSubmit(evt){
    const form = evt.target;
    evt.preventDefault();
}

$("#myModal").on('show.bs.modal',function(event){
    let modal=$(this);
    let button = $(event.relatedTarget)
    let myObject = button.data("item");
    choose = button.data("passed");
   
    console.log(choose);

    switch(choose){
        case "a":
            modal.find(".modal-header h4").text("Do u want to edit??");
            modal.find(".modal-body input").val(myObject.title);
            // $("input[type=text]").focus(); 
            //input tag ko lina/dina val() use garne
        
        
            modal.find('.btn-primary').on('click.1',function(){
        
                userInput =  modal.find('.modal-body input').val();
                console.log(userInput);
                modal.modal('hide');
                editToDo(myObject,userInput);   
                });
            break;

        case "b":
            modal.find(".modal-header h4").text("Do u want to remove??");
            modal.find(".modal-body input").val(myObject.title);

            // modal.find(".modal-body ").html("<p></p>"); //input tag ko lina/dina val() use garne
        
        
            modal.find('.btn-primary').on('click.1',function(){
                let sure = true;
           
                modal.modal('hide');
                removeToDo(myObject,sure);   
                });
            break;

        default :
            modal.find(".modal-header h4").text("Do u want to clear the local storage??");
            modal.find(".modal-body input").val("click save change to clear memory");
            // modal.find(".modal-body ").html("<p></p>"); //input tag ko lina/dina val() use garne
        
        
            modal.find('.btn-primary').on('click.1',function(){
                let sure = true;
           
                modal.modal('hide');
                clearToDo(myObject,sure);   
                });
        break;
    }
        }).on('hide.bs.modal',function(){
        let modal=$(this);
        modal.find('.btn-primary').off('click.1')    //click._____ bhane ra naam dinu parxa
});


function addToDo(){
    let userInput = $('#demo').val();
    let d = new Date();
    itemName = {
        id : d.getTime(),
        title : userInput,
        isCompleted : false
    };


    if(itemName.title == ""){
        alert("Empty item is invalid");
        return;
    }

    for (let obj of toDoItem){
        if (userInput == obj.title){
            alert("Duplicate item is invalid");
            return;
        }
    }
    $('#demo').val("");
    toDoItem.push(itemName);
    render(toDoItem);
    selectToDo();
    searchToDo();
    storeToDo();
    

}

function removeToDo(myObject,confirm){
    console.log("I am in remove");
    if (confirm == true){
        newArray = toDoItem.filter(updateArray);
        function updateArray(item){
            return item.id != myObject.id;
        }
    }
    console.log(newArray);
    toDoItem = newArray;
    searchToDo();
    storeToDo();   
}

function editToDo(myObject,userInput){
    var currentItem = myObject.title;
    console.log("mero edit garna la ko object ko naam-----",currentItem);
    // copy = userInput;
    
    // currentItem ;
    console.log("maile k enter gare ta---",userInput);
    if(currentItem === userInput){
        return;
    }
    // if (userInput == null ){   
    //     return;  
    // }
    if (userInput == ""){
        alert("Empty value is invalid");
        return;
    }
    
    for (let obj of toDoItem){
        if(userInput == obj.title){
            alert("Duplicate item is invalid")
            return;
        }   
    }

    for (let obj of toDoItem){
        if(myObject.id == obj.id){
            obj.title =userInput;
        }   
    }
    // obj.title = userInput;
    // console.log(obj.title);
    searchToDo();
    storeToDo();    
}

function selectToDo(){
      
    let select = $('#selection').val()
    storeToDo(select);
    console.log("selection 2--",select)
    if(select == "Complete"){
        
            completeItem = toDoItem.filter((item) => {
                return item.isCompleted == true;
            });
        if(completeItem.length == 0){
            console.log("uffff");
            alert("No item complete available.... add some");
            // render_empty();
        }
        render(completeItem); 
     }
    else if(select == "Incomplete"){

        inCompleteItem  = toDoItem.filter((item) => {
            return item.isCompleted == false; 
        });
        if(inCompleteItem.length == 0){
            console.log("uffff");
            alert("No incomplete item available.... add some");
        }
        render(inCompleteItem);    
    }
    else{
        render(toDoItem);   
    }
       
}

function searchToDo(){
    console.log("I am in search1");
    let newArray = [];
    let select = $('#selection').val();
   
    let search = $('.itemSearch').val();
    console.log(search);

    let complete = toDoItem.filter((item) => {
        return item.isCompleted == true;
    });

    let inComplete = toDoItem.filter((item) => {
        return item.isCompleted == false;
    });
    
    if (select == "Complete"){
        for(let obj of complete){
            let item = obj.title;
            let toBeSearched= RegExp(search,'i');
            result = item.search(toBeSearched);
            console.log(result);
    
            if (result != -1){
                newArray.push(obj);
            }    
        }
    }

    else if (select == "Incomplete"){

        for(let obj of inComplete){
            let item = obj.title;
            let toBeSearched= RegExp(search,'i');
            result = item.search(toBeSearched);
            console.log(result);
    
            if (result != -1){
                newArray.push(obj);
            }
        }   
    }

    else {
        for(let obj of toDoItem){
            let item = obj.title;
            let toBeSearched= RegExp(search,'i');
            result = item.search(toBeSearched);
            console.log(result);
    
            if (result != -1){
                newArray.push(obj);
            }
        }
    }
    
    selectToDo();
    render(newArray);
}
    
function storeToDo(select){
    storeData = JSON.stringify(toDoItem);
    localStorage.setItem("toDoItem",storeData); 
    localStorage.selects = select;
    
}

function retriveToDo(){
    let result =  localStorage.getItem("toDoItem");
    toDoItem = JSON.parse(result);
    choose = localStorage.selects;

    
    if(!toDoItem){
        toDoItem = [];
    }
    // $('#selection').html(choose);
    render(toDoItem);
    // switch(choose) {
    //     case 'All':
    //         render(toDoItem,choose); 
    //         break;
    //     case 'Complete':
    //         render(toDoItem,choose); 
    //         break;
    //     default:
    //         render(toDoItem,choose); 
    //         break;
    // }   
       
}

function clearToDo(confirm){
    if (confirm == false){
        return;
    }
    
    localStorage.removeItem("toDoItem"); 
    location.reload();
    toDoItem = [];
    render(toDoItem);
       
}

function render(array){
    $('#list').html("");
    // $('#selection').html(choose);
   
    
    for (let obj of array){
        $('#list').append(
            $('<div>').addClass("row gb-row-list").append(
                $('<li>').append([
                    $('<div>').addClass("col-md-2 gb-ul-col").append([
                   
                          $('<input>').addClass("gb-checkBox").attr({type : "checkbox",checked  :obj.isCompleted}).on('click',function(){
                              if (this.checked == true){
                                obj.isCompleted = true;
                              }
                              else{
                                obj.isCompleted = false;
                              }
                              storeToDo();
                          })
                       ]), 
                              $('<div>').addClass("col-md-6 gb-ul-col-6").append([
                                  $('<span>').addClass("gb-span-list").html(obj.title)
                              ]),
                              
                              $('<div>').addClass("col-md-2 gb-ul-col").append([
                                
                                  $('<button>').attr({"data-toggle" : "modal","data-target" : "#myModal","data-passed":"a","data-item": JSON.stringify(obj)})
                                  .addClass("btn btn-default gb-editBtn").append(
                                      $('<i>').addClass("fa fa-pencil")
                                  )
                              ]),
                                  
                              $('<div>').addClass("col-md-2 gb-ul-col ").append([
                                
                                  $('<button>').attr({"data-toggle" : "modal","data-target" : "#myModal","data-passed":"b","data-item": JSON.stringify(obj)})
                                  .addClass("btn btn-default gb-removeBtn").append(
                                      $('<i>').addClass("fa fa-trash")
                    
                                  )
                              ])
                  ])  

            )
         
        );
    }
    $('#total').html(array.length);    
}

retriveToDo();
// });




// function render_empty(){
    
//         console.log("uffff");
//         // alert("No item available.... add some");
//         $('#list').append(
//             $('<li>').append(
//             $('<p>').html("no item are available")
//         )
//     );
        
     
// }

              

                              
                              
                


                            
   




    





