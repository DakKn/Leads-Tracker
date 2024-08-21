let myLeads = []
const saveBtn = document.getElementById("save-btn")
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

// checking if local storage is empty or not
if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}


function render(leads){
    let listItems = ""
    for(let i = 0; i < leads.length; i++)
    {
        listItems += `
        <li>
            <a target='_blank' href='${leads[i]}'>
            ${leads[i]}
            </a>
        </li>
        `
    }
    ulEl.innerHTML = listItems
}


saveBtn.addEventListener("click",function (){
    myLeads.push(inputEl.value)
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    //clear out the input space
    inputEl.value=""
    render(myLeads)
})


deleteBtn.addEventListener("dblclick",function(){
    localStorage.clear()
    myLeads=[]
    render(myLeads)
})


tabBtn.addEventListener("click",function(){
    //Grab the url of the current tab
    chrome.tabs.query({active:true,currentWindow:true}, function(tabs){
    myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    render(myLeads)
})

})