import CytoscapeComponent from "react-cytoscapejs";
import data from "cytoscape/dist/cytoscape.esm";

const iconImage = {
    object:"https://upload.wikimedia.org/wikipedia/commons/7/7e/Circle-icons-profile.svg",
    car:"https://img.icons8.com/metro/40/000000/car.png",
    house:"https://img.icons8.com/ios/40/000000/city-block.png",
    telephone:"https://img.icons8.com/ios-glyphs/40/000000/ringer-volume.png",
    social:"https://img.icons8.com/wired/40/000000/domain.png",
    meet:"https://img.icons8.com/ios/40/000000/restaurant-table.png",
    company:"https://img.icons8.com/ios/35/000000/permanent-job.png",
}

const graphComponent = ({data}) => {
    return <div className="graph-component">
        <p className="graph-component__type">{data.type}</p>
        <p className="graph-component__title">{data.title}</p>
        <style className="graph-component__style" src={data.detail.image}></style>
    </div>
}

export const Graph = () => {
    class CytoscapeDomNode {
        constructor(cy, params = {}) {
            this._cy = cy;
            this._params = params;
            this._node_dom = {};
            let cy_container = cy.container();

            if (params.dom_container) {
                this._nodes_dom_container = params.dom_container;
            } else {
                let nodes_dom_container = document.createElement("div");
                nodes_dom_container.style.position = 'absolute';
                nodes_dom_container.style.zIndex = 10;

                let cy_canvas = cy_container.querySelector("canvas");
                cy_canvas.parentNode.appendChild(nodes_dom_container);

                this._nodes_dom_container = nodes_dom_container;
            }

            this._resize_observer = new ResizeObserver((entries) => {
                for (let e of entries) {
                    let node_div = e.target;
                    let id = node_div.__cy_id;
                    let n = cy.getElementById(id);
                    n.style({
                        'width': node_div.offsetWidth,
                        'height': node_div.offsetHeight
                    });
                }
            });

            cy.on('add', 'node', (ev) => {
                this._add_node(ev.target);
            });

            for (let n of cy.nodes())
                this._add_node(n);

            cy.on("pan zoom", (ev) => {
                let pan = cy.pan();
                let zoom = cy.zoom();

                let transform = "translate(" + pan.x + "px," + pan.y + "px) scale(" + zoom + ")";
                this._nodes_dom_container.style.msTransform = transform;
                this._nodes_dom_container.style.transform = transform;
            });

            cy.on('position bounds', 'node', (ev) => {
                let cy_node = ev.target;
                let id = cy_node.id();

                if (!this._node_dom[id])
                    return;

                let dom = this._node_dom[id];

                let style_transform = `translate(-50%, -50%) translate(${cy_node.position('x').toFixed(2)}px, ${cy_node.position('y').toFixed(2)}px)`;
                dom.style.webkitTransform = style_transform;
                dom.style.msTransform = style_transform;
                dom.style.transform = style_transform;

                dom.style.display = 'inline';
                dom.style.position = 'absolute';
                dom.style['z-index'] = 10;
            });
        }

        _add_node(n) {
            let data = n.data();

            if (!data.dom)
                return;

            this._nodes_dom_container.appendChild(data.dom);
            data.dom.__cy_id = n.id();

            this._node_dom[n.id()] = data.dom;

            this._resize_observer.observe(data.dom);
        }

        node_dom(id) {
            return this._node_dom[id];
        }
    }

    // function register(cy) {
    //     if (!cy)
    //         return;
    //
    //     cy('core', 'domNode', function(params, opts) {
    //         return new CytoscapeDomNode(this, params, opts);
    //     });
    // }
    // if (typeof(cytoscape) !== 'undefined') {
    //     register(cytoscape);
    // }

    const request = [
        {
            targets: [
                {
                    id: '2',
                    relationType: 'weak',
                    isBidirectional: false,
                    label:"Здрасти5"
                },
                {
                    id: '3',
                    relationType: 'weak',
                    isBidirectional: false,
                    label:"Здрасти4"
                },
                {
                    id: '4',
                    relationType: 'weak',
                    isBidirectional: false,
                    label:"Здрасти3"
                },
                {
                    id: '5',
                    relationType: 'weak',
                    isBidirectional: false,
                    label:"Здрасти2"
                },
                {
                    id: '6',
                    relationType: 'weak',
                    isBidirectional: false,
                    label:"Здрасти1"
                }
                ],
            data: {
                id: '1',
                type: 'Object',
                title: 'Бендер Остап Сулейманович',
                detail: {
                    image: iconImage.object,
                    characteristics: {
                        "Ф.И.О": "Бендер Остап Сулейманович",
                        "День рождения": "21.03.1992",
                        "#хэштег#": '#ostap22',

                    },
                    comments: 'Вино, женщины и карты нам обеспечены.'
                }
            }
        },
        {
            targets: [],
            data: {
                id: '2',
                title: '+79017950443',
                type: 'Abonent',
                detail: {
                    image: iconImage.telephone,
                    characteristics: {
                        "Номер телефона": '+79017950443',
                        "IMSI ": 'International Mobile Subscriber Identity',
                    },
                    comments: 'Время, которое у нас есть, — это деньги, которых у нас нет.'
                }
            }
        },
        {
            targets: [],
            data: {
                id: '3',
                title: 'Vk',
                type: 'SocialNetwork',
                detail: {
                    image: iconImage.social,
                    characteristics: {
                        "Наименование соцсети": 'VK',
                        Username :"Ostap2103",
                        ID :"3412"
                    },
                    comments: 'Знойная женщина — мечта поэта.'
                }
            }
        },
        {
            targets: [],
            data: {
                id: '4',
                title: 'BMW 320 black',
                type: 'car',
                detail: {
                    image: iconImage.car,
                    characteristics: {
                        ГРЗ : 'е666кз77',
                        марка : 'BMW 320 black',
                        vin : '5678956789067890',
                    },
                    comments: 'Лёд тронулся, господа присяжные заседатели!'
                }
            }
        },
        {
            targets: [],
            data: {
                id: '5',
                title: 'Adress',
                type: 'house',
                detail: {
                    image: iconImage.house,
                    characteristics: {
                        Адресс: 'Пушкина 22',
                    },
                    comments: 'Командовать парадом буду я!'
                }
            }
        },
        {
            targets: [],
            data: {
                id: '6',
                title: 'Fintech',
                type: 'Сompany',
                detail: {
                    image: iconImage.company,
                    characteristics: {
                        инн: '566796677557',
                    },
                    comments: 'CName - Финтех'
                }
            }
        },
        {
            targets: [
                {
                    id: '8',
                    relationType: 'strong',
                    isBidirectional: true,
                    label:"Здрасти",
                },
                {
                    id: '9',
                    relationType: 'strong',
                    isBidirectional: true,
                    label:"Здрасти"
                },],
            data: {
                id: '7',
                type: 'Object',
                title: 'Толстой Лев Николаевич',
                detail: {
                    image: iconImage.object,
                    characteristics: {

                        "День рождения": "9 сентября 1828",
                        "#хэштег#": '#lev1828',

                    },
                    comments: 'Утро помещика (1856)'
                }
            }
        },
        {
            targets: [],
            data: {
                id: '8',
                title: 'Cоюз писателей',
                type: 'Сompany',
                detail: {
                    image: iconImage.company,
                    characteristics: {
                        инн: '566796677557',
                    },
                    comments: 'Союз писателей'
                }
            }
        },
        {
            targets: [],
            data: {
                id: '9',
                title: 'Adress',
                type: 'house',
                detail: {
                    image: iconImage.house,
                    characteristics: {
                        Адресс: 'Ленина 22',
                    },
                    comments: 'Парам!'
                }
            }
        },
        {
            targets: [
                {
                    id: '7',
                    relationType: 'medium',
                    isBidirectional: true,
                    label:"Здрасти"
                },
                {
                id: '1',
                relationType: 'medium',
                isBidirectional: true,
                label:"Здрасти333"
            }],
            data: {
                id: '10',
                title: 'Вершина связи двух сущностей',
                type: 'Встреча',
                detail: {
                    image: iconImage.meet,
                    characteristics: {
                        OBJ1: 'Остап Сулейсанович',
                        OBJ2: "Лев Николаевич"
                    },
                    comments: 'Парам!'
                }
            }
        },
    ]

    request.forEach(obj => {
        if (obj.targets !== []) {
            obj.targets.forEach(target => {
                request.push({
                    data: {
                        source: `${obj.data.id}`,
                        target: `${target.id}`,
                        relationType: `${target.relationType}`,
                        label: `${target.label}`
                    }
                })
            })
        }
    })

    let elements = request

    let stylesheet = [
        {
            selector: 'node',
            style: {
                height: 80,
                width: 80,
                backgroundColor: 'gray',
            }
        },
        {
            selector: 'edge',
            style: {
                width: 6
            }
        },
        {
            selector: `edge[relationType = "weak"]`,
            style: {
                lineColor: '#008000',
                label: "Зеленый"
            }
        },
        {
            selector: `edge[relationType = "medium"]`,
            style: {
                lineColor: '#FFA500',
                label: "Оранжевый"
            }
        },
        {
            selector: `edge[relationType = "strong"]`,
            style: {
                lineColor: '#FF0000',
                label: "Красный"
            }
        }
    ]

    // function cardItem(data) {
    //     data.id = `cardItem${data.id}`
    //     const cardItem = document.createElement("div")
    //     cardItem.className = 'draggable'
    //     cardItem.style.fontSize = '20px';
    //     cardItem.style.borderRadius = '15px';
    //     cardItem.style.padding = '8px 20px';
    //     cardItem.style.position = 'relative';
    //     cardItem.style.width = '150px';
    //     cardItem.style.height = '75px';
    //     cardItem.style.backgroundColor = '#d2d0d1';
    //     cardItem.style.textAlign = 'center';
    //
    //     const type = document.createElement("p")
    //     type.style = {fontWeight: 700, margin: 0, textAlign: 'center', textTransform: 'capitalize'};
    //     type.innerHTML = data.type
    //
    //     const content = document.createElement("p")
    //     content.style = "margin: 0px;text-align: center;"
    //     content.innerHTML = data.title
    //
    //     const styleElem = document.head.appendChild(document.createElement("style"));
    //     cardItem.setAttribute("id", data.id);
    //     const defaultImage = 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Circle-icons-profile.svg'
    //
    //     styleElem.innerHTML = `#${data.id}:before {
    //     content: url("${data.detail.image}");
    //     position: absolute;
    //     top: -1px;
    //     left: -30px;
    //     transform: translate(50%,-50%);
    //     width: 40px;
    //     height: 40px;
    //     border-radius: 50%;
    //     border: 2px solid #d2d0d1;
    //     background: #ffffff;
    //     background-repeat:no-repeat;
    // }`
    //
    //
    //     cardItem.appendChild(type)
    //     cardItem.appendChild(content)
    //     const rp = undefined;
    //
    //     return {
    //         'group': 'nodes',
    //         'data': {
    //             'dom': cardItem,
    //             ...data
    //         },
    //         'renderedPosition': rp,
    //     }
    // }

    // elements.nodes().remove()
    // request.forEach(function(obj) {
    //     elements.add(cardItem(obj.data));
    // })
    // elements.edges.forEach((edge) => {
    //     const obj = {
    //         group: 'edges',
    //         ...edge
    //     }
    //     elements.add(obj);
    // });

    // cy.domNode();
    //
    // cy.nodes().remove();
    // request.forEach(function(obj) {
    //     cy.add(cardItem(obj.data));
    //     layout();
    // })
    //
    // elements.edges.forEach((edge) => {
    //     const obj = {
    //         group: 'edges',
    //         ...edge
    //     }
    //     cy.add(obj);
    // });
    //
    // cy.on('tap', 'node', function(evt) {
    //     const node = evt.target;
    //     const cardInfoId = node.id().replace('Item', 'Info');
    //     const cardInfoGetted = cy.nodes(`[id = "${cardInfoId}"]`);
    //     const data = node.data();
    //     const positionCardItem = node.position();
    //     const positionCardInfo = { ...positionCardItem };
    //     if (positionCardItem.y < (window.innerHeight / 2)) {
    //         positionCardInfo.y = positionCardInfo.y - 300;
    //     } else {
    //         positionCardInfo.y = positionCardInfo.y + 300;
    //     }
    //
    //     const cardInfoData = {
    //         cardInfoId,
    //         label: true,
    //         rp: null,
    //         detail: {
    //             title: data.title,
    //             ...data.detail
    //         }
    //     }
    //
    //     if (!cardInfoGetted.length) {
    //         cy.add(cardInfo(cardInfoData));
    //         const otro = cy.nodes(`[id = "${cardInfoId}"]`);
    //         otro.position(positionCardInfo);
    //     } else {
    //         const cardData = cardInfoGetted.data()
    //         const domCard = document.getElementById(cardData.id);
    //         domCard.remove();
    //         cy.remove(`[id = "${cardInfoId}"]`);
    //     }
    // });
    //
    // function cardInfo({ cardInfoId, label, rp, detail}) {
    //     const id = cardInfoId || `cardInfo${cy.nodes().length}`;
    //     const cardInfo = document.createElement("div");
    //     cardInfo.setAttribute("id", id);
    //     cardInfo.className = "draggable";
    //     cardInfo.style = "background-color: white;box-shadow: -10px 10px 8px 0 rgba(0,0,0,0.2); width: 300px;";
    //
    //     const cardInfoImage = document.createElement("div");
    //     cardInfoImage.style = "width: 200px;height: 30px;position: relative;overflow: hidden;border-radius: 50%;margin: 0 auto;";
    //     cardInfo.appendChild(cardInfoImage)
    //
    //     const image = document.createElement("img")
    //     // image.src = "https://www.peoples.ru/character/literature/ostap_bender/bender_1.jpg" || detail.img
    //     cardInfoImage.appendChild(image)
    //
    //     const title = document.createElement("h3")
    //     title.style = "text-transform: capitalize; font-weight: 700; padding-left: 30px;"
    //     title.innerHTML = detail.title
    //     cardInfo.appendChild(title)
    //
    //     const charsDiv = document.createElement("div")
    //     charsDiv.style = "padding: 2px 30px"
    //     cardInfo.appendChild(charsDiv)
    //
    //     Object.entries(detail.characteristics).forEach(attr => {
    //         const lineChar = document.createElement("p")
    //         lineChar.style = "margin-top: 4px"
    //         lineChar.style = "text-transform: capitalize"
    //         lineChar.innerHTML = `${attr[0]}: ${attr[1]}`
    //         charsDiv.appendChild(lineChar)
    //     })
    //
    //     const commentsDiv = document.createElement("div")
    //     commentsDiv.style = "padding: 2px 30px"
    //     cardInfo.appendChild(commentsDiv)
    //
    //     const lineComment = document.createElement("p")
    //     lineComment.innerHTML = detail.comments
    //     commentsDiv.appendChild(lineComment)
    //
    //     return {
    //         'data': {
    //             'id': id,
    //             'label': label || `n${cy.nodes().length}`,
    //             'dom': cardInfo,
    //         },
    //         'renderedPosition': rp,
    //     };
    // }

    // function cardItem(data) {
    //     data.id = `cardItem${data.id}`
    //     const cardItem = document.createElement("div")
    //     cardItem.className = 'draggable'
    //     cardItem.style = "font-size: 20px;border-radius: 15px;padding: 8px 20px;position: relative;width: 150px;height: 75px;background-color: #d2d0d1;text-align: text-center;"
    //
    //     const type = document.createElement("p")
    //     type.style = "font-weight: 700; margin: 0px;text-align: center;text-transform: capitalize;"
    //     type.innerHTML = data.type
    //
    //     const content = document.createElement("p")
    //     content.style = "margin: 0px;text-align: center;"
    //     content.innerHTML = data.title
    //
    //     const styleElem = document.head.appendChild(document.createElement("style"));
    //     cardItem.setAttribute("id", data.id);
    //     const defaultImage = 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Circle-icons-profile.svg'
    //
    //     styleElem.innerHTML = `#${data.id}:before {
    //     content: url("${data.detail.image}");
    //     position: absolute;
    //     top: -1px;
    //     left: -30px;
    //     transform: translate(50%,-50%);
    //     width: 40px;
    //     height: 40px;
    //     border-radius: 50%;
    //     border: 2px solid #d2d0d1;
    //     background: #ffffff;
    //     background-repeat:no-repeat;
    // }`
    //
    //
    //     cardItem.appendChild(type)
    //     cardItem.appendChild(content)
    //     const rp = undefined;
    //
    //     return {
    //         'group': 'nodes',
    //         'data': {
    //             'dom': cardItem,
    //             ...data
    //         },
    //         'renderedPosition': rp,
    //     }
    // }

    // const RelationTypesColorEnum = {
    //     STRONG: '#dd1513', //amarillo o rojo
    //     MEDIUM: '#dbb135', //negro
    //     WEAK: '#1b669b', //grisaseo
    // };
    // Object.freeze(RelationTypesColorEnum);

    // function layout() {
    //     let options = {
    //         name: 'grid',
    //         fit: true, // whether to fit the viewport to the graph
    //         padding: 10, // the padding on fit
    //         avoidOverlap: true, // prevents node overlap, may overflow boundingBox and radius if not enough space
    //         spacingFactor: 1.8, // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
    //     };
    //
    //     cy.layout(options).run();
    // }

    let graph = <CytoscapeComponent elements={request}
                                    style={{
                                        height: '100%',
                                        width: '100%',
                                        position: 'absolute',
                                        left: 0,
                                        top: 0,}}
                                    layout={{
                                        name: 'grid',
                                        fit: true,
                                        padding: 50,
                                        avoidOverlap: true,
                                        spacingFactor: 1.8,
                                    }}
                                    stylesheet={stylesheet}
                                    boxSelectionEnabled={true}
                                    autounselectify={false}/>

    console.log(graph.props)

    return graph
}