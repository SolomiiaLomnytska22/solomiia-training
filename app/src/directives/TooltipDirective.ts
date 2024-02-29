import { VNodeDirective } from 'vue'
import './TooltipDirective.css'
import { Point, Size } from '@/types'

const position: Point = { x: 0, y: 0 }
const boxSize: Size = { width: 0, height: 0 }
let currClass: string;

export default {
  bind (el: HTMLElement, binding: VNodeDirective):void {
    setupTooltipElements(el, binding)
    el.addEventListener('mousemove', (event) => handleMouseMove(event, el))
  },

  update (el: HTMLElement, binding: VNodeDirective):void {
    updateTooltipContent(el, binding)
  },

  unbind (el: HTMLElement):void  {
    el.removeEventListener('mousemove', (event) => handleMouseMove(event, el))
    removeTooltipElements(el)
  }
}

function setupTooltipElements (el: HTMLElement, binding: VNodeDirective):void {
  el.classList.add('tooltip-element')

  const tooltipElement = createTooltipElement(binding.value.text, binding.value.styleType)
  el.appendChild(tooltipElement)
}

function createTooltipElement (text: string, styleType:string):HTMLElement {
  currClass = styleType
  const tooltipElement: HTMLElement = document.createElement('div')
  tooltipElement.classList.add('tooltip')
  tooltipElement.classList.add(currClass)
  const textElement: HTMLElement = document.createElement('span')
  textElement.classList.add('text')
  textElement.textContent = text
  textElement.classList.add(styleType)
  tooltipElement.appendChild(textElement)
  return tooltipElement
}

function updateTooltipContent (el: HTMLElement, binding: VNodeDirective):void {
  const textElement: HTMLElement = el.querySelector('.text') as HTMLElement
  textElement.textContent = binding.value.text

  updateTooltipStyle(el)
}

function updateTooltipStyle (el: HTMLElement):void {
  const textElement: HTMLElement = el.querySelector('.text') as HTMLElement
  const tooltipElement: HTMLElement = el.querySelector(
    '.tooltip'
  ) as HTMLElement
  const newClass: string = getStyleType(el)

  if (currClass !== newClass) {
    textElement.classList.remove(currClass)
    tooltipElement.classList.remove(currClass)

    currClass = newClass

    textElement.classList.add(currClass)
    tooltipElement.classList.add(currClass)
  }
}

function removeTooltipElements (el: HTMLElement): void {
  const tooltipElement = el.querySelector('.tooltip') as HTMLElement;
  const textElement = el.querySelector('.text') as HTMLElement;
  if (tooltipElement && tooltipElement.parentNode === el) {
    el.removeChild(tooltipElement);
  }

  if (textElement && textElement.parentNode === tooltipElement) {
    tooltipElement.removeChild(textElement);
  }
}

function handleMouseMove (event: MouseEvent, el: HTMLElement):void {
  position.x = event.clientX
  position.y = event.clientY
  updateTooltipStyle(el)
}

function getStyleType (el: HTMLElement): string {
  getSize(el)
  if (position.y < boxSize.height + 50) {
    //header height: 50px
    return 'bottom'
  } else if (position.x > window.innerWidth - (boxSize.width + 20)) {
    //page padding: 20px
    return 'left'
  } else if (position.x < boxSize.width + 20) {
    //page padding: 20px
    return 'right'
  } else {
    return 'top'
  }
}

function getSize (el: HTMLElement):void {
  boxSize.width = el.offsetWidth
  boxSize.height = el.offsetHeight
}
