document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('moto-list')) {
        fetchMotos()
    }

    if (document.getElementById("moto-detail")) {
        fetchMotoDetail()
    }
})

async function fetchMotos() {
    try {
        const response = await fetch('https://personal-94zkstob.outsystemscloud.com/RoyalEnfield/rest/RoyalEnfieldBackEnd/GetMotos');
        const data = await response.json();

        renderMotos(data);
        console.log(data)
    } catch (error) {
        console.error('Erro ao buscar motos')
    }
}

function renderMotos(motos) {
    const container = document.getElementById('moto-list')
    container.innerHTML = ""

    motos.forEach( moto => {
        const divMoto = document.createElement('div')
        divMoto.classList.add("moto-list__item")

        const imgMoto = document.createElement('img')
        imgMoto.classList.add('moto-list__img', 'grow-hover')
        imgMoto.src = moto.ImageListLink
        imgMoto.alt = moto.Name

        const divDetail = document.createElement('div')
        divDetail.classList.add('moto-list__details')

        const pName = document.createElement('p')
        pName.classList.add('detail-name')
        pName.textContent = moto.Name

        const pPrice = document.createElement('p')
        pPrice.classList.add('detail-price')
        pPrice.textContent = `R$ ${moto.Price.toLocaleString('pt-BR')}`

        const buttonDetail = document.createElement('button')
        buttonDetail.classList.add('btn-primary')
        buttonDetail.textContent = 'Detalhes'
        buttonDetail.onclick = function() {
            window.location.href = `moto-detail.html?id=${moto.Id}`
        }

        divDetail.appendChild(pName)
        divDetail.appendChild(pPrice)
        divDetail.appendChild(buttonDetail)

        divMoto.appendChild(imgMoto)
        divMoto.appendChild(divDetail)
        
        container.appendChild(divMoto)
    })
}

async function fetchMotoDetail() {
    const urlParams = new URLSearchParams(window.location.search)
    const motoId = urlParams.get('id')

    try {
        const response = await fetch('https://personal-94zkstob.outsystemscloud.com/RoyalEnfield/rest/RoyalEnfieldBackEnd/GetMotos')
        const motos = await response.json()
        const moto = motos.find( m => m.Id === parseInt(motoId))

        if (moto) {
            renderMotoDetail(moto)
        } else {
            document.getElementById('moto-detail').innerHTML = 'Moto não encontrada :('
        }

        console.log(moto)
    } catch (error) {
        console.error('Erro ao buscar detalhes da moto', error)
        document.getElementById('moto-detail').innerHTML = "Erro ao carregar os detalhes"
    }


}

function renderMotoDetail(moto) {
    const container = document.getElementById('moto-presentation')
    container.innerHTML = ''

    const motoImageDiv = document.createElement('div')
    motoImageDiv.classList.add('moto-presentation__img')

    const motoImage = document.createElement('img')
    motoImage.src = moto.imageBannerLink
    motoImage.alt = moto.Name

    motoImageDiv.appendChild(motoImage)

    const motoDescDiv = document.createElement('div')
    motoDescDiv.classList.add('moto-presentation__description')

    const descTitle = document.createElement('h1')
    descTitle.textContent = moto.Name

    const descText = document.createElement('p')
    descText.textContent = moto.Description

    const comparDiv = document.createElement('div')
    comparDiv.classList.add('comprar-container')

    const price = document.createElement('p')
    price.textContent = `R$ ${moto.Price.toLocaleString('pt-BR')}`

    const buttonCompar = document.createElement('button')
    buttonCompar.classList.add('btn-primary')
    buttonCompar.textContent = 'Comprar'
    buttonCompar.onclick = function() {
        window.location.href = "#"
    }

    const imageDetail = document.getElementById("detail")

    const imgImageDetail = document.createElement('img')
    imgImageDetail.classList.add("image-detail")
    imgImageDetail.src = moto.ImageDetailLink
    imgImageDetail.alt = moto.Name    

    comparDiv.appendChild(price)
    comparDiv.appendChild(buttonCompar)

    motoDescDiv.appendChild(descTitle)
    motoDescDiv.appendChild(descText)
    motoDescDiv.appendChild(comparDiv)

    container.appendChild(motoImageDiv)
    container.appendChild(motoDescDiv)

    imageDetail.appendChild(imgImageDetail)
}