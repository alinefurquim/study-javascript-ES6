 class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados() {
        for(let i in this) {
          if(this[i] == undefined || this[i] == '' || this[i] == null) {
            return false
            } 
        }
        return true
    }
}

class Bd {

    constructor() {
        let id = localStorage.getItem('id')

        if(id === null) {
            localStorage.setItem('id', 0)
        }
    }

    getProximoId() {
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }

    gravar(d) {
        let id = this.getProximoId()
        localStorage.setItem(id, JSON.stringify(d))
        localStorage.setItem('id', id)
    }

    recuperarTodosRegistros() {

        //array de despesas
        let despesas = Array()

        let id = localStorage.getItem('id')

        //recuperar todas as despesas cadastradas em localstore
        for(let i = 1; i <= id; i++) {
            //recuperar a despesa
            let despesa = JSON.parse(localStorage.getItem(i))

            //existe a possibilidade de haver índices que foram pulados/removidos
            //nestes casos nós vamos pula esses índices
            if(despesa === null) {
                continue
            }
            despesas.push(despesa)
        }

        return despesas
    }
}

let bd = new Bd()

function cadastrarDespesa() {
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa(
        ano.value, 
        mes.value, 
        dia.value, 
        tipo.value, 
        descricao.value, 
        valor.value)

    if(despesa.validarDados()) {
        bd.gravar(despesa)
        //dialog de sucesso
        $('#sucessoGravacao').modal('show')
    } 
    else {
        //dialog de erro
        $('#erroGravacao').modal('show')
    }
}

function carregaListaDespesas() {
    let despesas = Array()
    despesas = bd.recuperarTodosRegistros()
    //selecionando o elemento tbody da tabela
    let listaDespesas = document.getElementById('listaDespesas')
    
    /* <tr>
      <td>15/03/2018</td>
      <td>Alimentação</td>
      <td>Compras do mê</td>
      <td>444.75</td>
    </tr>
    */

    //percorrer o array despesas, listando cada despesa de forma dinâmica
    despesas.forEach(function(d) {
        //console.log(d)
        //criando a linha (tr)
       let linha = listaDespesas.insertRow()

       //criar as colunas (td)
       linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
       
       //ajustar o tipo
       switch(d.tipo) {
            case '1': d.tipo = 'Alimentação'
                break
            case '2': d.tipo = 'Educação'
                break
            case '3': d.tipo = 'Lazer'
                break
            case '4': d.tipo = 'Saúde'
                break
            case '5': d.tipo = 'Transporte'
                break
        }
        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor
    })
}