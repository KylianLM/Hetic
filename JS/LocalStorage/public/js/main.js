// Function permettant de sauvegarder dans le localstorage (Stringify + Stockage)
function toStockage(key, value)
{
    value = JSON.stringify(value);
    localStorage.setItem(key , value)
}

// Function permettant de recuperer dans le localstorage une valeur a partir
// de la key (Recuperation + Parse)
function toJS(key)
{
    var value = localStorage.getItem(key);
    value = JSON.parse(value);
    return value;
}

// Function qui verifie si un menu est present dans le localstorage
function setMenu()
{
    if(!localStorage.getItem('menu'))
    {
        toStockage('menu', menu);
    } else {
        return 0;
    }
}

// Function qui affiche le menu dans le document HTMl
function affichage()
{
    // Recuperation des Div dedie a l'affichage des pizzas et des pates
    var content = {
        "pizza" : document.querySelector('#pizza'),
        "pates" : document.querySelector('#pates')
    };

    content.pizza.innerHTML = "<h2> Pizzas </h2>";
    content.pates.innerHTML = "<h2> Pâtes </h2>";
    var data = toJS('menu');

    // Boucle qui parcours la data "menu"
    for(var i = 0; i < data.length ; i++) {
        // Selectionne la bonne div en fonction du type
        var selecteur = '#' + data[i].type;
        var content = document.querySelector(selecteur);
        content.innerHTML +="<h3 class='subheader'>"+ data[i].name + "</h3><br>";
        for(var j = 0 ; j < data[i].recipe.length ; j++) {
            // Sert a enlever la virgule du dernier ingredient
            if ( j == data[i].recipe.length - 1) {
                content.innerHTML += data[i].recipe[j].name;
            } else {
                content.innerHTML += data[i].recipe[j].name+' , ';
            }
        }
        content.innerHTML += "<br><span class='secondary button'>"+ data[i].price + " €</span><br> <hr>";
    }
}

// Function appeller lorsqu'on envoie un nouveau plat
function recup()
{

    var data = {
        "name" : document.querySelector('#name').value,
        "type" : document.querySelector('#type').value,
        "recipe" : document.querySelector("#recipe").value,
        "price" : document.querySelector('#price').value
    };

    if (data.name == '' || data.type == '' || data.recipe == '' || data.price == '') {
        alert('Vous devez remplir tous les champs');
    } else {
        // Passe d'une chaine de caractere a un tableau
        data.recipe = data.recipe.split(",");
        // Formatte le tableau au bon format
        for (var i = 0; i < data.recipe.length; i++){
            data.recipe[i] = {
                name : data.recipe[i]
            }
        }

        var menu = toJS('menu');
        menu.push(data);
        toStockage('menu', menu);

        affichage();
    }
}
// Evenement ajouter au submit du formulaire
var submit = document.querySelector('#send');

submit.addEventListener('click', function(e){
    e.preventDefault();
    recup();
});
setMenu();
affichage();