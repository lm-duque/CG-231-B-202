/**
 * Geometria: Crea un objeto tTHREE.Geometry y lo retorna
 * Entradas:  vertices = Arreglo de vertices (Arreglo de arreglo de enteros)
 * Salida:    geom = objeto THREE.Geometry generado a partir del arreglo vertices
 */
    function Geometria(vertices){
        geom = new THREE.Geometry();
        for (let i = 0; i < vertices.length; ++i) {
            x = vertices[i][0];
            y = vertices[i][1];
            z = vertices[i][2];
            vector = new THREE.Vector3(x, y, z);
            geom.vertices.push(vector);
        }
        return geom;
    }

/**
 * Traslation: Crea la matriz de traslación a partir del vector vt
 * Entradas:   vt = Vector de traslacion
 * Salida:     matrixT = Matriz de traslacion generada a partir de vt
 */
    function Traslacion(vt) {
        var matrizT = new THREE.Matrix4();
        matrizT.set(1, 0, 0, vt[0],
            0, 1, 0, vt[1],
            0, 0, 1, vt[2],
            0, 0, 0, 1);
        return matrizT;
    }

/**
 * Escalado: Crea la matriz de escalado 'matrizS' a partir del vector vs
 * Entradas: vs = Vector de escalado
 * Salida:   matrixS = Matriz de escalado generada a partir de vs
 */
    function Escalado(vs) {
        var matrizS = new THREE.Matrix4();
        matrizS.set(vs[0], 0, 0, 0,
            0, vs[1], 0, 0,
            0, 0, vs[2], 0,
            0, 0, 0, 1);
        return matrizS;
    }

/**
 * EscaladoReal: 
 * Entradas: obj = Objeto de tipo THREE.line a ser escalado
             vp = Vector de posicion inicial de obj (Arreglo de 3 enteros)
             vs = Vector de escalado (Arreglo de 3 enteros)
 * Salidas:  Obj actualizado
 */
    function EscaladoReal(obj, vp, vs){
        vt = [-vp[0], -vp[1], -vp[2]]
        obj.applyMatrix(Traslacion(vt)); // Traslacion de obj al origen
        obj.applyMatrix(Escalado(vs)); // Escalado de obj
        obj.applyMatrix(Traslacion(vp)); // 
    }

/**
 * Rotación: Crea la matriz de rotación 'matrizR' a partir del vector vr
 * Entradas: eje = Vector unitario de eje
             rt = Ángulo de rotación en grados
 * Salidas:  matrixR = Matriz de rotación generada a partir de vr en eje indicado
   rotación eje X:                   rotación eje Y:                   rotación eje Z:
   rotacionR.set(1,  0,   0, 0,      rotacionR.set(cs, 0, -sn, 0,      rotacionR.set( cs, sn, 0, 0,
                 0, cs, -sn, 0,                     0, 1,   0, 0,                    -sn, cs, 0, 0, 
                 0, sn,  cs, 0,                    sn, 0,  cs, 0,                      0,  0, 1, 0,
                 0,  0,   0, 1);                    0, 0,   0, 1);                     0,  0, 0, 1);
 */
    function Rotacion(eje, rt) {
        var matrizR = new THREE.Matrix4(); 
        let rad = rt * Math.PI / 180; // Convertir grados a radianes
        [cs, sn] = [Math.cos(rad), Math.sin(rad)]; // Array de valores funciones coseno y seno
        switch (eje) {
            case 'X':
            case 'x':
                matrizR.set(1, 0, 0, 0,
                    0, cs, sn, 0,
                    0, -sn, cs, 0,
                    0, 0, 0, 1);
                break;
            case 'Y':
            case 'y':
                matrizR.set(cs, 0, -sn, 0,
                    0, 1, 0, 0,
                    sn, 0, cs, 0,
                    0, 0, 0, 1);
                break;
            case 'Z':
            case 'z':
                matrizR.set(cs, sn, 0, 0,
                    -sn, cs, 0, 0,
                    0, 0, 1, 0,
                    0, 0, 0, 1);
                break;

        }
        return matrizR;
    }