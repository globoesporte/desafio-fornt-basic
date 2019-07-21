$(document).ready(function(){
    console.log('%c Arquivo Json', 'color: orange;')
    console.log({data});

    //buscar atleta
    $('input.barra-atleta').change(function() {
        console.log('testando change');
        $("table.lista-jogadores tbody").empty();
        data.players.forEach(function (value, i) {
            let nomeJogador = data.players[i].name;
            let textoDigitado = $('input.barra-atleta').val();
            let img_avatar = data.players[i].atleta_imagem;
            console.log(img_avatar);

            if(nomeJogador.includes(textoDigitado) || 
                nomeJogador.includes(textoDigitado.toUpperCase()) ||
                nomeJogador.includes(textoDigitado.toLowerCase())){
                value = nomeJogador;
                console.log('%d: %s', i, value);
                $('table.lista-jogadores').append('<tr> <td class="nome-jogador">'+
                    '<img src="assets/images/avatars/'+ img_avatar +'"> '+
                   '<strong>'+ nomeJogador +'</strong> </td> '+
                '<td>' + data.players[i].date + '</td>'+
                '<td>' + data.players[i].team.sigla + '</td>'+
                '<td>' + data.players[i].games + '</td>'+
                '<td>' + data.players[i].goals + '</td>'+
                '<td> 00% </td>'+
                '</tr>');
            }      
        })
        
    })

    //sorter
    var table = $('table.lista-jogadores');
    $('th').children().click(function(){
        var table = $(this).parents('table.lista-jogadores').eq(0);
        var ths = table.find('tr:gt(0)').toArray().sort(compare($(this).index())); //pega tudo abaixo do th selecionado
        this.asc = !this.asc;
        if(!this.asc)
           ths = ths.reverse();
           //$(this).append(' V ');

        for(var i = 0; i < ths.length; i++)
           table.append(ths[i]);

    });

});

function compare(idx) {
    return function(a, b) {
       var A = tableCell(a, idx), B = tableCell(b, idx)
       return $.isNumeric(A) && $.isNumeric(B) ? 
          A - B : A.toString().localeCompare(B)
    }
}

function tableCell(tr, index){ 
    return $(tr).children('td').eq(index).text() 
}