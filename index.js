const form = document.querySelector('#form')

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    removePrevious()
    const name = e.target[0].value
    const info = await getInfo(name)
    handleInfo(info)

})


async function getInfo(name){
    const age = await axios.get(`https://api.agify.io/?name=${name}`)
    const gender = await axios.get(`https://api.genderize.io/?name=${name}`)
    const nationality = await axios.get(`https://api.nationalize.io/?name=${name}`)

    const country_code = nationality.data.country[0].country_id
    const country = await axios.get(`https://restcountries.eu/rest/v2/alpha/${country_code}`)

    let info = {
        age : age.data,
        gender : gender.data,
        nationality : country.data.name
    }

    return info
}


function handleInfo(info){
    const newH2 = document.createElement('h2')
    const div = document.querySelector('#info')
    newH2.innerText = `Since your name is ${info.age.name} therefore: `
    newH2.setAttribute('id', 'h2-Att')
    div.prepend(newH2)

    const age = document.createElement('h3')
    const list = document.querySelector('#list')
    age.innerText = `Your age is: ${info.age.age}`
    age.setAttribute('class','list-item')
    list.appendChild(age)
    const gender = document.createElement('h3')
    gender.innerText = `Your gender is: ${info.gender.gender}`
    gender.setAttribute('class','list-item')
    list.appendChild(gender)
    const nationality = document.createElement('h3')
    nationality.innerText = `Your nationality is: ${info.nationality}`
    nationality.setAttribute('class','list-item')
    list.appendChild(nationality)


    

}

function removePrevious(){
    const h2 = document.getElementById('h2-Att')
    
    if(h2){
        h2.remove()
        $('.list-item').remove()
    }
}