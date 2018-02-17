//import { polyfill } from 'mobile-drag-drop'

//MobileDragDrop.polyfill()

//set dragdrop for item
function setDragDrop(item) {
  item.setAttribute('ondrop', 'drop(event, this)')
  item.setAttribute('ondragenter', 'dragenter(event)')
  item.setAttribute('ondragleave', 'dragleave(event)')
  item.setAttribute('ondragover', 'dragover(event)')
  if (item.classList.contains('filled')) {
    item.setAttribute('draggable', 'true')
    item.setAttribute('ondragstart', 'dragstart(event)')
  }
}

//record dragged item
function dragstart(ev) {
  ev.dataTransfer.setData('text', ev.target.id)
}

//dragover event = allow drop
function dragover(ev) {
  ev.preventDefault()
}

function dragenter(ev) {
  ev.preventDefault()
  ev.target.classList.add('dragover')
}

function dragleave(ev) {
  ev.preventDefault()
  ev.target.classList.remove('dragover')
}

function drop(ev, target) {
  ev.preventDefault()
  ev.target.classList.remove('dragover')
  let sourceId = ev.dataTransfer.getData('text')
  const source = document.getElementById(sourceId)
  swap(source, target)
}

function swap(source, target) {
  if (source === target) {
    return
  }
  const parent = source.parentNode
  const temp = target.cloneNode(true)
  parent.insertBefore(temp, source.nextElementSibling)
  parent.replaceChild(source, target)
}
