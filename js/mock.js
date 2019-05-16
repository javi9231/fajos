
const preguntas = [
  {
    id: 1,
    nivelDificultad: 1,
    pregunta: 'James Cameron tuvo la idea de Terminator cuando... ',
    pista: 'Tenía fiebre cuando se le ocurrió',
    curiosidad: 'Una pesadilla febríl con un robot que intentaba matarlo',
    respuestas:  [
      {
        respuesta: 'Leía un Comic',
        probabilidad: 1, // en caso de eliminar alguna esta no se eliminaria
        isTrue: 'false'
      },
      {
        respuesta: 'Libro',
        probabilidad: 0,
        isTrue: 'false'
      },
      {
        respuesta: 'Pesadilla',
        probabilidad: 1,
        isTrue: 'true'
      }
    ]
  },
  {
    id: 2,
    nivelDificultad: 0,
    pregunta: 'Qué modelo de Terminator es representado por Arnold Schwarzenegger',
    pista: 'Es más que un 600 y menos de 1000',
    curiosidad: 'T800',
    respuestas:  [
      {
        respuesta: 'T600',
        probabilidad: 0,
        isTrue: 'false'
      },
      {
        respuesta: 'T900',
        probabilidad: 1,
        isTrue: 'false'
      },
      {
        respuesta: 'T1100',
        probabilidad: 0,
        isTrue: 'false'
      },
      {
        respuesta: 'T800',
        probabilidad: 1,
        isTrue: 'true'
      }
    ]
  },
  {
    id: 3,
    nivelDificultad: 1,
    pregunta: 'Es una mejora de T-888 ',
    pista: 'Es triste de pedir',
    curiosidad: 'T-888 es capaz de robar la piel de otro para reparar la suya',
    respuestas:  [
      {
        respuesta: 'Envejece',
        probabilidad: 1,
        isTrue: 'false'
      },
      {
        respuesta: 'superoido',
        probabilidad: 0,
        isTrue: 'false'
      },
      {
        respuesta: 'robar piel',
        probabilidad: 1,
        isTrue: 'true'
      }
    ]
  },
  {
    id: 4,
    nivelDificultad: 2,
    pregunta: 'Cual es la frase más famosa de Terminator',
    pista: 'I’ll be back',
    curiosidad: 'Volveré es según American Film Institute está en el puesto 37' +
    'de las mejores frases de película. Y Hasta la vista, baby en el puesto 76',
    respuestas:  [
      {
        respuesta: 'Hasta la vista Baby',
        probabilidad: 1,
        isTrue: 'false'
      },
      {
        respuesta: 'Volveré',
        probabilidad: 1,
        isTrue: 'true'
      }
    ]
  },
  {
    id: 5,
    nivelDificultad: 0,
    pregunta: 'Nombre inteligencia artificial',
    pista: 'Red del cielo',
    curiosidad: 'Skynet es una Inteligencia artificial capaz de controlar el'+
    ' arsenal militar de los Estados Unidos con independencia de los humanos',
    respuestas:  [
      {
        respuesta: 'SkyIA',
        probabilidad: 1,
        isTrue: 'false'
      },
      {
        respuesta: 'Intranet',
        probabilidad: 0,
        isTrue: 'false'
      },
      {
        respuesta: 'IA',
        probabilidad: 0,
        isTrue: 'false'
      },
      {
        respuesta: 'Skynet',
        probabilidad: 1,
        isTrue: 'true'
      }
    ]
  }
];

const cuestionario = [
    {
        "_id": "5bb47248c6632b0bde14803a",
        "nombre": "Bienal AR&PA",
        "tiempo": 100,
        "numeroPreguntas": "",
        "publish": true,
        "preguntas": [
            {
                "pregunta": "¿Quién organiza el evento?",
                "respuestas": [
                    "La Diputación de Valladolid",
                    "La Junta de Castilla y León",
                    "El Ministerio de Educación, Cultura y Deporte",
                    "La Diputación de León"
                ],
                "imagen": "",
                "respuestaCorrecta": "1",
                "estadisticas": [
                    0,
                    0,
                    0,
                    0
                ],
                "comodines": [
                    {
                        "pista": "Se encarga de la administración de toda la Comunidad de Castilla y León"
                    },
                    {
                        "_5050": [
                            "2",
                            "0"
                        ]
                    }
                ]
            },
            {
                "pregunta": "¿Desde qué año se celebra este evento?",
                "respuestas": [
                    "Desde el año 2010",
                    "Es el primer año que se celebra",
                    "Desde el año 2004",
                    "Desde el año 2008"
                ],
                "imagen": "",
                "respuestaCorrecta": "2",
                "estadisticas": [
                    0,
                    0,
                    0,
                    0
                ],
                "comodines": [
                    {
                        "pista": "Desde el año en el que Zapatero se convirtió en Presidente del Gobierno"
                    },
                    {
                        "_5050": [
                            "1",
                            "0"
                        ]
                    }
                ]
            },
            {
                "pregunta": " ¿Por qué es especial la edición de este año?",
                "respuestas": [
                    " Porque es el año Europeo de Patrimonio Cultural",
                    "Porque es el centenario de la Bienal",
                    " Porque por primera vez es un evento internacional",
                    "Ninguna de las anteriores"
                ],
                "imagen": "",
                "respuestaCorrecta": null,
                "estadisticas": [
                    0,
                    0,
                    0,
                    0
                ],
                "comodines": [
                    {
                        "pista": "Se están celebrando numerosos eventos e iniciativas por todo Europa "
                    },
                    {
                        "_5050": [
                            "1",
                            "2"
                        ]
                    }
                ]
            }
        ],
        "isArcade": true
    },
    {
        "_id": "5c7923f8290db368730bed05",
        "nombre": "Prueba 1",
        "tiempo": 60,
        "numeroPreguntas": "",
        "publish": false,
        "preguntas": [
            {
                "pregunta": "asdfff",
                "respuestas": [
                    "aasdf",
                    "asdf",
                    "asdf",
                    "asdf"
                ],
                "imagen": "https://gameserver.centic.ovh/files/1528206480618-homer_1.png",
                "respuestaCorrecta": "1",
                "estadisticas": [
                    0,
                    0,
                    0,
                    0
                ],
                "comodines": [
                    {
                        "pista": "gdfg"
                    },
                    {
                        "_5050": [
                            "0",
                            "2"
                        ]
                    }
                ]
            }
        ],
        "isArcade": false,
        "name": "newimage"
    },
    {
        "_id": "5c79264b290db368730bed0c",
        "nombre": "Prueba 2",
        "tiempo": 30,
        "numeroPreguntas": "",
        "publish": false,
        "preguntas": [
            {
                "pregunta": "asdfff",
                "respuestas": [
                    "aasdf",
                    "asdf",
                    "asdf",
                    "asdf"
                ],
                "imagen": "https://gameserver.centic.ovh/files/1528206480618-homer_1.png",
                "respuestaCorrecta": "1",
                "estadisticas": [
                    0,
                    0,
                    0,
                    0
                ],
                "comodines": [
                    {
                        "pista": "gdfg"
                    },
                    {
                        "_5050": [
                            "0",
                            "2"
                        ]
                    }
                ]
            }
        ],
        "isArcade": true
    },
    {
        "_id": "5c792698290db368730bed0f",
        "nombre": "¿Cuanto sabes de...?",
        "tiempo": 60,
        "numeroPreguntas": "",
        "publish": false,
        "preguntas": [
            {
                "pregunta": "Quién más quien menos posee un e-book. A rentabilizarlo. Literatura: ¿cuál de estas obras es un cantar de gesta? ",
                "respuestas": [
                    "El Cantar del Mio Cid",
                    "El libro de buen amor",
                    "El Periquillo Sarniento",
                    "El libro de la Selva"
                ],
                "imagen": "",
                "respuestaCorrecta": "0",
                "estadisticas": [
                    0,
                    0,
                    0,
                    1
                ],
                "comodines": [
                    {
                        "pista": "Fue un gran conquistador"
                    },
                    {
                        "_5050": [
                            "3",
                            "1"
                        ]
                    }
                ],
                "number": 1
            }
        ],
        "isArcade": true
    },
    {
        "_id": "5c8ba02f290db368730bed20",
        "nombre": "hrthrhre",
        "tiempo": 80,
        "numeroPreguntas": "",
        "publish": true,
        "preguntas": [
            {
                "pregunta": "cvbncvbncvb",
                "respuestas": [
                    "ncvbncvbncvbn",
                    "cvbncvbncvbncvbn",
                    "cvbncvncvbncvncvbn",
                    "cvbncvbncvbncvbn"
                ],
                "imagen": "",
                "respuestaCorrecta": "0",
                "estadisticas": [
                    0,
                    0,
                    0,
                    0
                ],
                "pista": "cvbncvbncvb",
                "_5050": [
                    "2",
                    "3"
                ]
            },
            {
                "pregunta": "dfghdfghdfgh",
                "respuestas": [
                    "dfghdfghd",
                    "dfghdfhdfgh",
                    "dfghdfghdfghdfgh",
                    "sdfgsfgasdfasdfa"
                ],
                "imagen": "",
                "respuestaCorrecta": "0",
                "estadisticas": [
                    0,
                    0,
                    0,
                    0
                ],
                "pista": "xdgdsfsgsdf",
                "_5050": [
                    "1",
                    "3"
                ]
            },
            {
                "pregunta": "ghkjghfdgasdg",
                "respuestas": [
                    "hdhdfhsfgd<fdhgffgfshgfgf",
                    "afgasdgasdgasdg",
                    "asdgasdgasdgasdgas",
                    "dgasdgasdgasdgasgd"
                ],
                "imagen": "",
                "respuestaCorrecta": "3",
                "estadisticas": [
                    0,
                    0,
                    0,
                    0
                ],
                "pista": "tyr",
                "_5050": [
                    "0",
                    "1"
                ]
            },
            {
                "pregunta": "dfvsdfvsdfv",
                "respuestas": [
                    "sdfvsdfvsdfv",
                    "sdfvsdfvsdfv",
                    "sdfvsdfvsdfv",
                    "sdfvsdfvsdfvs"
                ],
                "imagen": "",
                "respuestaCorrecta": "1",
                "estadisticas": [
                    0,
                    0,
                    0,
                    0
                ],
                "pista": "sdfvsdfvsdf",
                "_5050": [
                    "2",
                    "3"
                ]
            },
            {
                "pregunta": "hrtdhrdtherth",
                "respuestas": [
                    "erthertherthe",
                    "rtherthertherth",
                    "erthertherther",
                    "erthertherthert"
                ],
                "imagen": "",
                "respuestaCorrecta": "0",
                "estadisticas": [
                    0,
                    0,
                    0,
                    0
                ],
                "pista": "erthertherth",
                "_5050": [
                    "1",
                    "2"
                ]
            },
            {
                "pregunta": "vxcbdfbxcvbxcvb",
                "respuestas": [
                    "xcvbxcvbxcvbxcv",
                    "xcvbxcvbxcvb",
                    "xcvnbnxcnxcnxcv",
                    "xcnvxcvnxcvn"
                ],
                "imagen": "",
                "respuestaCorrecta": "1",
                "estadisticas": [
                    0,
                    0,
                    0,
                    0
                ],
                "pista": "xcvnxcvnxcvnxc",
                "_5050": [
                    "0",
                    "2"
                ]
            }
        ],
        "isArcade": true
    }
];
