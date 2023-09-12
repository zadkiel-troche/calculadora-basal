const ERROR = document.getElementById('error');
const FLU = document.getElementById('flu');
const MAN = document.getElementById('man');
const VOL = document.getElementById('vol');
const LOADER = document.getElementById('loader');

let peso = 0;
let resultado = 0;
let mantenimiento = 0;
let mantenimientoMasMedio = 0;
let superficieCorporal = 0;
let volumenDiario = 0;
let flujoHorario = 0;
let volumenDiario1 = 0;
let volumenDiario2 = 0;

let botonCalcular = document.getElementById('calcular');

botonCalcular.addEventListener('click', calcularHidratacion);

// funcion para calcular la hidratacion
function calcularHidratacion() {

    peso = document.getElementById("peso").value;

    LOADER.classList.remove('d-none');
    ERROR.classList.add('d-none');
    VOL.innerHTML = '';
    FLU.innerHTML = '';
    MAN.innerHTML = '';

    if(peso > 0){
        if (peso <= 30) {
            resultado = calcularHollidaySegar(peso);
    
            flujoHorario = resultado.flujoHorario;
            mantenimiento = resultado.mantenimiento;
            volumenDiario = resultado.volumenDiario;
            
            setTimeout(() => {
                LOADER.classList.add('d-none');
                imprimir(flujoHorario, mantenimiento, peso, {par3: volumenDiario});
            }, 1500);
        }else{
            resultado = calcularSuperficieCorporal(peso);
    
            volumenDiario1 = resultado.volumenDiario1;
            volumenDiario2 = resultado.volumenDiario2;
            
            setTimeout(() => {
                LOADER.classList.add('d-none');
                imprimir(volumenDiario1, volumenDiario2, peso);
            }, 1500);
        }
        VOL.style.display = 'block';
        FLU.style.display = 'block';
        MAN.style.display = 'block';
    }else{
        ERROR.classList.remove('d-none');
        LOADER.classList.add('d-none');
        VOL.classList.add('d-none');
        FLU.classList.add('d-none');
        MAN.classList.add('d-none');
    }

}

// funcion para calcular cuando es menor a 30kg
function calcularHollidaySegar(peso) {
    if (peso <= 10) {
        volumenDiario = peso * 100;
    } else if (peso <= 20) {
        volumenDiario = 1000 + ((peso - 10) * 50);
    } else {
        volumenDiario = 1500 + ((peso - 20) * 20);
    }

    flujoHorario = Math.round(volumenDiario / 24);
    mantenimiento = Math.round(flujoHorario * 1.5);

    return { volumenDiario, mantenimiento, flujoHorario};
}

// funcion para calcular cuando es mayor a 30kg
function calcularSuperficieCorporal(peso) {
    resultado = ((peso * 4) + 7) / (peso + 90);
    volumenDiario1 = Math.round(resultado * 1500);
    volumenDiario2 = Math.round(resultado * 2000);
    
    return { volumenDiario1, volumenDiario2 };
}

// funcion para imprimir los resultados
function imprimir(par1, par2, peso, {par3}={}) {

    if(peso<=30){
        VOL.innerHTML = 'VD : ' + par3 + ' cc/dia';
        FLU.innerHTML = par1 + ' cc/hr';
        MAN.innerHTML = 'm+m/2 : ' + par2 + ' cc/hr';
    }else{
        FLU.innerHTML = 'SC * 1500 : ' + par1;
        MAN.innerHTML = 'SC * 2000 : ' + par2;
    }

}