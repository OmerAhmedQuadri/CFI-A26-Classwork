const root = document.getElementById('root')

function createAndAppendElement(type, props, children) {
    const ele = document.createElement(type)
    ele.innerHTML = children
    // ele.setAttribute('id', props.id)
    // ele.setAttribute('onclick', props.onclick)
    for (const key in props) {
        ele.setAttribute(key, props[key])
    }
    root.appendChild(ele)
}

createAndAppendElement('button', { id: 'btn', onclick: "console.log('clicked')"  }, 'Hello world')