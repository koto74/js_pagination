let sections = []
let paginationButtons = []
let paginationList = []
let currentSectionIndex = 0
let PAGINATION_DISTANCE = 0
let PAGINATION_DISPLAY_MAX = 0

const BREAK_POINT = 1100

// ページネーションの左右表示数
function setPaginationWidth() {
  PAGINATION_DISTANCE = 1
  PAGINATION_DISPLAY_MAX = 5 
}

function activate() {
  sections[currentSectionIndex].classList.add('is-current')
  paginationButtons[currentSectionIndex].classList.add('is-current')
}

function deactivate() {
  sections[currentSectionIndex].classList.remove('is-current')
  paginationButtons[currentSectionIndex].classList.remove('is-current')
}

// 1ページ目のカードリストのみ表示
function displaySections() {
  sections = Array.from(document.querySelectorAll('.p-blogList'))
  sections[0].classList.add('is-current')
}

// ページネーションのボタンクリックイベント
function attachButtons() {
  attachButtonFirst()
  attachButtonLast()
  attachButtonPrev()
  attachButtonNext()
}

// 初めのページへ遷移
function attachButtonFirst() {
  arrowButton = document.getElementById('c-pagination__prev--first')
    document.getElementById('c-pagination__prev--first').addEventListener('click', () => {
      deactivate()
      currentSectionIndex = 0
      activate()
      displayPaginationList()
    })
}

// 最後のページへ遷移
function attachButtonLast() {
  arrowButton = document.getElementById('c-pagination__next--last')
    document.getElementById('c-pagination__next--last').addEventListener('click', () => {
      deactivate()
      currentSectionIndex = sections.length - 1
      activate()
      displayPaginationList()
    })
}

// 前のページへ遷移
function attachButtonPrev() {
  document.getElementById('c-pagination__prev').addEventListener('click', () => {
    deactivate()
    if (currentSectionIndex > 0) {
      currentSectionIndex--
    }
    activate()
    displayPaginationList()
  })
}


// 次のページへ遷移
function attachButtonNext() {
  document.getElementById('c-pagination__next').addEventListener('click', () => {
    deactivate()
    if (currentSectionIndex < sections.length - 1) {
      currentSectionIndex++
    }
    activate()
    displayPaginationList()
  })
}

// ページネーションのリスト作成
function createPaginationList() {
  const totalPages = sections.length
  paginationList = document.getElementById('c-pagination__list')
  paginationList.innerHTML = ''

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement('button')
    button.classList.add('c-pagination__button')
    button.textContent = i

    button.addEventListener('click', () => {
      deactivate()
      currentSectionIndex = i - 1
      activate()
      displayPaginationList()
    })
    paginationList.appendChild(button)
  }
  paginationButtons = Array.from(document.querySelectorAll('.c-pagination__button'))
}

// ページネーションの表示
function displayPaginationList() {
  displayPaginationButtons()
  setOpacityArrowButtons()
}

// ページネーションのボタン表示
function displayPaginationButtons() {
  // 表示用ページネーションリストクリア
  while (paginationList.firstChild) {
    paginationList.removeChild(paginationList.firstChild)
  }
  // ページが一定数に満たさなければ矢印ボタンは描画しない
  if (sections.length <= PAGINATION_DISPLAY_MAX) {
    addMiddlePaginationButton(true)
  } else {
    addMiddlePaginationButton(false)
    addPaginationEllipsis()
  }
}

// ページネーションの矢印ボタンのdisabled設定
function setOpacityArrowButtons() {
  if (currentSectionIndex === 0) {
    document.getElementById('c-pagination__prev').disabled = true
    document.getElementById('c-pagination__prev--first').disabled = true
  } else {
    document.getElementById('c-pagination__prev').disabled = false
    document.getElementById('c-pagination__prev--first').disabled = false
  }
  if (currentSectionIndex === sections.length - 1) {
    document.getElementById('c-pagination__next').disabled = true
    document.getElementById('c-pagination__next--last').disabled = true
  } else {
    document.getElementById('c-pagination__next').disabled = false
    document.getElementById('c-pagination__next--last').disabled = false
  }
}

// 表示用ページネーションリスト作成
function addMiddlePaginationButton(isAll) {
  if (isAll) {
    for (let i = 0; i < paginationButtons.length; i++) {
      paginationList.appendChild(paginationButtons[i])
    }
  } else {
    for (let i = 0; i < paginationButtons.length; i++) {
      if (i >= currentSectionIndex - PAGINATION_DISTANCE && i <= currentSectionIndex + PAGINATION_DISTANCE) {
        paginationList.appendChild(paginationButtons[i])
      }
    }
  }
}

// ページネーションの省略記号表示
function addPaginationEllipsis() {
    // currentSectionIndexが端の要素の場合は追加でボタンを表示
    if (currentSectionIndex == 0) {
      paginationList.appendChild(paginationButtons[PAGINATION_DISTANCE + 1])
    }
    if (currentSectionIndex == paginationButtons.length - 1) {
      paginationList.prepend(paginationButtons[paginationButtons.length - PAGINATION_DISTANCE * 2 - 1])
    }
}

document.addEventListener('DOMContentLoaded', function () {
  setPaginationWidth()
  displaySections()
  attachButtons()
  createPaginationList()
  displayPaginationList()
  activate()
})
