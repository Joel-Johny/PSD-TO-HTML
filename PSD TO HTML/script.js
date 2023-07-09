function toggler(element){

    const ul_submenu=element.nextElementSibling
    ul_submenu.classList.toggle("show-sub-menu")
    
    const expand_icon=element.children[1]
    if(expand_icon.textContent == "add")
        expand_icon.textContent="remove"
    else
        expand_icon.textContent="add"
    
   
}