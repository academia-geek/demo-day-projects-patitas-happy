import React from 'react';
import { Link } from 'react-router-dom';
import { Accordion } from 'react-bootstrap';
import dog from '../img/dog-sinfondo.png'
import '../Styles/Style.css'
import { Acordion, ButtonRosa, Grid1, ImgDog, ParrafoH, TitleH } from '../Styles/StyleHome';
import Footer from "./Footer";
import { Grid } from '@mui/material';


const Home = () => {

    return (
        <div >
            <Grid container columns={{ xs: 4, sm: 8, md: 12 }}
                justifyContent="center"
                
            >
                <Grid1>
                    <TitleH>
                        ¿Quieres saber el nombre de tu próximo compañero de aventuras?
                    </TitleH>
                    <ParrafoH>Conoce los detalles de los animales que tenemos en nuestra fundación para que elijas al mejor compañero para ti.
                    </ParrafoH>
                    <ButtonRosa>VER MASCOTAS</ButtonRosa>
                </Grid1>
                <Grid>
                    <ImgDog src={dog} alt="" />
                </Grid>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    marginTop={10}
                >
                    <h2>TOMA NOTA </h2>
                    <p>Tips para el bienestar fisico y mental de tu mascota en casa.</p>

                    <Acordion className='w-50'>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Visita el veterinario periódicamente</Accordion.Header>
                            <Accordion.Body>
                                La visita al veterinario es fundamental. Este especialista no solo te ayudará a controlar la salud de tu mascota, sino que puede responderte todas las dudas que tengas. Así, si acabas de adoptar a una mascota, encontrarás una atención apropiada cada vez que visites a este experto en animales.

                                Muchas mascotas requieren una pronta vacunación o desparasitación en los primeros meses de vida. Podrás llevar al día estas atenciones gracias a una cartilla que suele entregarte el veterinario.

                                Las vacunas garantizan una buena defensa en el organismo de tu mejor amigo, protegiéndole de posibles infecciones que podrían ser fatales si no se protege. En este sentido, es necesario que lleves una correcta vacunación.

                                Existen determinadas razas, como algunas de perro, que requieren cuidados especiales, ya que nacen con problemas congénitos. Infórmate antes de adoptar y mantén una estrecha relación con el veterinario para garantizar el bienestar animal de tu mascota.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Cuida de su cabello</Accordion.Header>
                            <Accordion.Body>
                                Este apartado está dedicado exclusivamente a aquellos animales que tienen pelaje. Si tu mascota no tiene pelo, tampoco debes descuidar su piel, ya que algunas especies requieren de una atención especial.

                                Al igual que el veterinario es imprescindible, el profesional en peluquería y estética de mascotas puede serte esencial. Independientemente de que busques cambiar el look a tu mejor amigo, mantenerle un pelaje saludable significa evitar que contraiga parásitos, como pulgas o garrapatas. Estos son los responsables de muchas enfermedades que, al igual que afectan a tu mascota, puedes adquirirlas tú.

                                Otro tema es la idea de higiene y limpieza que tenemos sobre nuestras mascotas. Es posible que si no has tenido antes un amigo peludo, no sepas cuál es la mejor opción en este sentido. No creas que por bañar diariamente a tu perro o a tu gato vas a protegerlos. El baño diario es contraproducente en estos casos, ya que termina por dañar su epidermis, exponiéndolos a enfermedades. Tu veterinario o estilista de mascotas puede recomendarte este tipo de higiene cada uno o dos meses, en función de la raza o especie que poseas.

                                Y es que a través de su pelaje, puedes comprobar la salud de mejor amigo. Cuando se vuelve opaco o notas que comienza a caerse, suele indicarte una enfermedad, que deberás tratar inmediatamente. El cepillado periódico también es muy necesario para evitar que se creen nudos en su pelo. Claro que esto se da en caso de que este tienda a crecer. Cuando lo cepilles, trata de hacerlo con precaución, eligiendo el cepillo o peine más apropiado.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>Sácale a pasear</Accordion.Header>
                            <Accordion.Body>
                                Saca a pasear a tu mascota. El ejercicio físico es fundamental para su bienestar animal. Con él consigue aminorar su estrés, que puede incrementarse ante la falta de movimiento. Una prueba de esto es ese instinto destructor que algunas mascotas suelen mostrar en casa. Para evitarnos un disgusto, debemos comprender esta necesidad de ejercicio.

                                Sacarle a pasear implica muchas cosas. Puedes aprovechar para que haga sus necesidades. Solo recuerda que las salidas deben ser programadas. Elige horas fijas cada día con el fin de que tu mascota adapte sus horas de orinar con cada paseo.

                                El paseo también es crucial para que tu mejor amigo socialice. Mientras más joven aprenda a hacerlo, menos posibilidades existen de que se haga agresivo con otros animales.

                                En el caso de los gatos y los perros, necesitan jugar, ayudándoles a bajar el estrés. No dejes de dedicarles unos minutos al día para la practicar con ellos distintas actividades. Es crucial para que gocen de unos buenos niveles de bienestar animal.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header>Mantén su dieta equilibrada</Accordion.Header>
                            <Accordion.Body>
                                En cada etapa de su vida cada mascota necesita una dieta específica. Los cachorros, por ejemplo, necesitan un alimento alto en grasas, aunque tomas pequeñas, que pueden variar entre 1 a 2 diarias.

                                Aunque los premios pueden ser de ayuda, sobre todo cuando les enseñas a hacer algún truco, selecciona los más adecuados. Ten en cuenta que el instinto animal les hace reconocer muchas cosas de la naturaleza como alimento indispensable.

                                Para equilibrar su dieta, puedes darle verduras y carne, en el caso de los perros y gatos. No dudes en preguntarle al veterinario cuál es la mejor manera de cuidar de tu mascota. Ten en cuenta que si tienes peces, se recomienda darles pequeñas porciones de alimento, ya que tienden a devorarlo todo.

                                Debes tener en cuenta que tanto el infrapeso como el sobrepeso impedirán que tu amigo goce de unos buenos niveles de bienestar animal. Controlar el peso de tu compañero es muy importante. Así podrás evitar enfermedades relacionadas con el sistema circulatorio, protegiendo a su corazón, especialmente si es adulto.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="4">
                            <Accordion.Header>Demuéstrale tu cariño</Accordion.Header>
                            <Accordion.Body>
                                Es cierto que puede ser complicado mostrar cariño a tus peces. En el caso de los perros, es fundamental, ya que pueden percibir tu estado de ánimo, repercutiendo sobre ellos directamente.

                                Si aún estás decidiendo si adoptar una mascota o no, ten en cuenta sus características personales. Los perros, según sus razas, pueden necesitar más o menos compañía. De la misma forma, es necesario que estés pendiente de todo lo que necesitan, dejándoles agua y comida suficiente. Si te ves más independiente, quizás un gato sea tu mejor opción. Aunque esto no quita que busquen una caricia de vez en cuando.

                                La ternura que muestres a tus mascotas les ayudará a estar relajadas. En cambio, si te ven alertado o nervioso, posiblemente les produzcas estrés. Dales amor y te lo devolverán con creces.

                                Sigue estos consejos para el bienestar animal de tu mascota. No descuides su salud y juega con ellos para que sean felices. Una dieta equilibrada y el ejercicio diario harán que tenga una buena vida, pero no olvides darle tu amor.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Acordion>
                </Grid>

            </Grid>
            <Footer />
        </div>

    );
};

export default Home;