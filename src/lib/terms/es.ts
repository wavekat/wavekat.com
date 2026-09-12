import type { TermsDoc } from '../terms';

// Español (es-419 neutro). Traducción de ./en.ts — la estructura, los ids de
// sección y el orden son idénticos, para que /es/terms/#recording resuelva y
// los pares hreflang sigan siendo recíprocos.
export const terms: TermsDoc = {
  seoTitle: 'Términos del servicio — WaveKat',
  seoDescription:
    'El acuerdo entre usted y WaveKat: para qué puede usar WaveKat Voice, por qué no sirve para llamar a emergencias y quién responde por grabar las llamadas.',
  h1: 'Términos del servicio',
  updatedPrefix: 'Última actualización:',
  lead: [
    'Estos términos son el acuerdo entre usted y WaveKat. Cubren la aplicación WaveKat Voice, su cuenta de WaveKat, la herramienta de línea de comandos wk, y este sitio web y las herramientas que contiene. Usar cualquiera de ellos significa aceptar lo que sigue.',
    'Esta página está escrita en lenguaje claro por quienes construimos WaveKat. No es asesoría legal. Se publica en nueve idiomas; si alguna vez una traducción y la versión en inglés difieren, la que se aplica es la versión en inglés.',
  ],
  highlightsLabel: 'Tres cosas antes de empezar',
  highlights: [
    '**WaveKat Voice no sirve para llamar a emergencias.** Es software para llamar, no una línea telefónica: una llamada al 111, 999, 911, 112 o al número de emergencias de su país puede no conectarse o no llegar al lugar correcto. Tenga siempre a mano un móvil o una línea fija que sí pueda.',
    '**Grabar es responsabilidad suya, y la grabación viene activada.** Si puede grabar, y si debe avisarlo antes, depende de dónde estén usted y la otra persona. En algunos países, equivocarse puede ser un delito.',
    '**Esto es software en beta hecho por un equipo muy pequeño.** Se entrega tal como está, sin garantías, y va a cambiar. Guarde copias propias de todo lo que no pueda permitirse perder.',
  ],
  onThisPage: 'En esta página',
  sections: [
    {
      id: 'acceptance',
      heading: 'Aceptar estos términos',
      body: [
        {
          kind: 'p',
          text: 'Usted acepta estos términos la primera vez que hace cualquiera de las siguientes cosas, lo que ocurra primero: instalar o usar WaveKat Voice, crear una cuenta de WaveKat o usar una función Pro. La aplicación le pide su acuerdo la primera vez que la abre, y la página de inicio de sesión lo dice encima del botón — pero usar WaveKat sin haber leído nunca esta página no lo deja fuera del acuerdo.',
        },
        {
          kind: 'p',
          text: 'Si acepta en nombre de una empresa, nos está diciendo que puede comprometerla, y de aquí en adelante «usted» significa esa empresa.',
        },
        {
          kind: 'p',
          text: 'La [política de privacidad](/privacy/) no forma parte de este contrato: es nuestra descripción de qué recoge WaveKat y qué se queda en su propia computadora, y estamos obligados por ella la haya leído o no. Si esta página y esa alguna vez parecen contradecirse sobre sus datos, gana la política de privacidad.',
        },
      ],
    },
    {
      id: 'who',
      heading: 'Quién puede usar WaveKat',
      body: [
        {
          kind: 'p',
          text: 'Tiene que tener al menos 16 años. WaveKat Voice es una herramienta de trabajo y no está dirigida a menores.',
        },
        {
          kind: 'p',
          text: 'También tiene que estar en un lugar donde podamos ofrecerla. Si está en un país sujeto a sanciones comerciales que alcanzan a software como este, o figura en una lista de sanciones, no puede usar WaveKat.',
        },
      ],
    },
    {
      id: 'account',
      heading: 'Su cuenta de WaveKat',
      body: [
        {
          kind: 'p',
          text: 'No necesita una cuenta para usar WaveKat Voice. Sin cuenta la aplicación es completamente local, y todo lo que hay dentro se queda en su computadora.',
        },
        {
          kind: 'p',
          text: 'Si crea una, es suya y usted la cuida. Inicia sesión con GitHub, Google o Apple, y después puede añadirle una contraseña a la cuenta. Mantenga en orden el que use de esos servicios —y el segundo factor que tenga— y escríbanos a [hello@wavekat.com](mailto:hello@wavekat.com) si cree que alguien más ha entrado. Lo que se haga desde su cuenta es responsabilidad suya hasta que nos avise.',
        },
        {
          kind: 'p',
          text: 'Una persona, una cuenta. No comparta la suya con sus colegas y no use la de otra persona. Si su equipo necesita varias personas, creen varias cuentas.',
        },
        {
          kind: 'p',
          text: 'Puede que una cuenta nueva tenga que ser aprobada antes de poder hacer nada.',
        },
      ],
    },
    {
      id: 'plans',
      heading: 'Lo que cuesta',
      body: [
        {
          kind: 'p',
          text: 'WaveKat Voice se descarga gratis y se usa gratis. Algunas funciones son parte del plan Pro; donde lo son, la aplicación lo dice antes de que llegue a ellas, no después.',
        },
        {
          kind: 'p',
          text: 'Durante el acceso anticipado, Pro no cuesta nada. Si lo pide en el sitio web, se lo damos por un período indicado sin cargo, y no vamos a empezar a cobrar por un período que ya le dimos. Hoy no hay ningún proceso de pago en WaveKat, así que nada de esto puede quitarle dinero.',
        },
        {
          kind: 'p',
          text: 'Cuando Pro tenga un precio, le diremos el precio, la moneda y el plazo antes de que pague nada, y actualizaremos esta página. No se le cobrará nada que no haya aceptado antes. Donde la ley de consumo de su país le dé más de lo que aquí escribimos, manda su ley.',
        },
      ],
    },
    {
      id: 'licence',
      heading: 'Su licencia para usar la aplicación',
      body: [
        {
          kind: 'p',
          text: 'WaveKat Voice se le licencia, no se le vende. Puede instalarla y usarla en las computadoras que usted controla, mientras dure este acuerdo, para su propio trabajo o el de su empresa.',
        },
        {
          kind: 'p',
          text: 'Lo que esa licencia no incluye:',
        },
        {
          kind: 'list',
          items: [
            'Vender, alquilar, sublicenciar o redistribuir la aplicación, ni incluirla en algo que usted venda.',
            'Desarmarla —descompilarla, desensamblarla o aplicarle ingeniería inversa— salvo en la medida en que la ley de su país se lo permita pese a lo que digamos aquí.',
            'Quitarle el nombre o las marcas de WaveKat, ni presentarla como producto propio.',
            'Sortear las comprobaciones que separan las funciones gratuitas de las Pro.',
          ],
        },
        {
          kind: 'p',
          text: 'La aplicación, el sitio web y todo lo que hay en ellos siguen siendo nuestros. Las bibliotecas de código abierto de WaveKat sobre las que se construye la aplicación son otra cosa: están publicadas en [GitHub](https://github.com/wavekat) con sus propias licencias, y nada de lo que hay aquí limita lo que usted puede hacer con ellas.',
        },
        {
          kind: 'p',
          text: 'La copia de WaveKat Voice que descarga de nosotros busca actualizaciones y las instala sola, para que las correcciones lleguen de verdad a la gente. Donde se instaló desde una tienda, de eso se encarga la tienda.',
        },
      ],
    },
    {
      id: 'stores',
      heading: 'Si la instaló desde una tienda',
      body: [
        {
          kind: 'p',
          text: 'WaveKat Voice también está en la Mac App Store, la Microsoft Store y la Snap Store. Si la consiguió en alguna de ellas, se aplican también los términos propios de esa tienda a la descarga y a cualquier actualización que le entregue, además de este acuerdo.',
        },
        {
          kind: 'p',
          text: 'Este acuerdo es entre usted y WaveKat, no la tienda. Apple, Microsoft y Canonical no hicieron WaveKat Voice, no le deben mantenimiento ni soporte por ella y no son responsables de ella, de ningún reclamo sobre ella ni de nada que haga con sus datos. Pueden, sin embargo, valerse de este acuerdo y hacerlo cumplir frente a usted como si fueran parte de él — las normas de Apple nos obligan a decirlo.',
        },
      ],
    },
    {
      id: 'acceptable',
      heading: 'Para qué no puede usar WaveKat',
      body: [
        {
          kind: 'p',
          text: 'La versión corta: no use WaveKat para hacerle a otra persona algo que no querría que le hicieran a usted.',
        },
        {
          kind: 'list',
          items: [
            '**Llamadas no solicitadas.** Nada de campañas automáticas, marcación en frío ni mensajes grabados a gente que no pidió tener noticias suyas, ni nada que incumpla un registro de exclusión publicitaria.',
            '**Hacerse pasar por otra persona.** No envíe un identificador de llamada que no le corresponde ni use un flujo de llamada o un aviso de voz generado para suplantar a una persona o a una empresa.',
            '**Grabar a alguien de forma ilegal.** Vea la sección siguiente: esto es lo bastante serio como para tener la suya.',
            '**Cualquier cosa ilegal o dirigida a dañar a alguien**: fraude, acoso, amenazas o ayudar a otra persona a hacerlo.',
            '**Romper el servicio a propósito**: atacarlo, buscarle agujeros sin avisarnos antes o automatizarlo de un modo que lo empeore para los demás.',
            '**Revender WaveKat como si fuera su propio servicio de llamadas** sin un acuerdo por escrito con nosotros.',
          ],
        },
        {
          kind: 'p',
          text: 'Si encuentra un fallo de seguridad, cuéntenoslo en [hello@wavekat.com](mailto:hello@wavekat.com) antes que a nadie más. A quien busca de forma responsable no lo perseguimos.',
        },
      ],
    },
    {
      id: 'phone',
      heading: 'Su servicio telefónico, y las llamadas de emergencia',
      body: [
        {
          kind: 'p',
          text: '**No se puede contar con WaveKat Voice para llamar a emergencias.** Es software que habla con una línea telefónica que usted ya tiene. No sabe dónde está, no puede decirle a un operador de emergencias adónde mandar ayuda, y una llamada puede no conectarse si su internet, su computadora o su proveedor tienen un mal día. Tenga a mano un móvil o una línea fija que sí llegue a emergencias, y asegúrese de que todo el que use esta computadora lo sepa.',
        },
        {
          kind: 'p',
          text: 'El servicio telefónico no es nuestro. Usted trae su propio proveedor SIP, tiene su propio contrato con él, y es él —no nosotros— quien cursa sus llamadas, se las factura y le da sus números. Si las llamadas no conectan, el proveedor suele ser el sitio por donde empezar.',
        },
        {
          kind: 'p',
          text: 'Un flujo de llamada responde a quien llama en su nombre —un saludo, un menú, buzón de voz, una transferencia— mientras la aplicación esté en ejecución en una computadora encendida. Lo que les diga, y lo que haga con lo que le dejen, es responsabilidad suya, igual que si usted mismo hubiera atendido. No sustituye a un teléfono que alguien contesta.',
        },
        {
          kind: 'p',
          text: 'Usted responde por lo que su proveedor le cobre, incluidas las llamadas que un flujo de llamada atienda o haga mientras usted no mira.',
        },
      ],
    },
    {
      id: 'recording',
      heading: 'Grabar, transcribir y compartir llamadas',
      body: [
        {
          kind: 'p',
          text: 'WaveKat Voice graba las llamadas, y la grabación está activada desde que la instala. La transcripción en vivo está desactivada hasta que usted la active. Las dos cosas ocurren en su propia computadora: no se envía audio a ningún sitio para grabarlo ni para transcribirlo.',
        },
        {
          kind: 'p',
          text: '**Si tiene derecho a hacerlo es cosa de la ley del lugar donde estén usted y la otra persona, y es responsabilidad suya, no nuestra.** En algunos sitios basta con su propio consentimiento. En otros hace falta que estén de acuerdo todos los de la llamada, y en unos cuantos equivocarse es un delito y no un asunto civil. La aplicación reproduce un pitido de aviso al empezar una llamada grabada, por cortesía; un pitido no es consentimiento.',
        },
        {
          kind: 'p',
          text: 'Si no está seguro: diga que está grabando, o apague la grabación en Ajustes. Las dos cosas llevan un momento y ninguna se puede deshacer después.',
        },
        {
          kind: 'p',
          text: 'Lo mismo vale para lo que haga con la grabación después: compartirla por enlace, enviarla a un servicio que haya conectado o guardarla. Si una grabación contiene datos personales de otra persona, es usted quien responde por ellos ante la ley de privacidad, y nosotros los tratamos por cuenta suya.',
        },
      ],
    },
    {
      id: 'content',
      heading: 'Sus llamadas siguen siendo suyas',
      body: [
        {
          kind: 'p',
          text: 'Sus grabaciones, transcripciones, contactos, flujos de llamada y notas son suyos. No reclamamos la propiedad de nada de eso, y no lo usamos para entrenar modelos salvo que usted haya elegido explícitamente permitirlo.',
        },
        {
          kind: 'p',
          text: 'Si inicia sesión y deja activada la sincronización en la nube —que está activada de forma predeterminada en cuanto inicia sesión— nos da permiso para almacenar y mover ese contenido con un único fin: hacer funcionar el servicio para usted. Eso significa sincronizarlo entre sus dispositivos, mostrárselo en el sitio web y servir una grabación a quien usted haya dado un enlace. El permiso termina cuando borra el contenido o su cuenta.',
        },
        {
          kind: 'p',
          text: 'Los avisos de voz que genere con la herramienta de este sitio web son suyos para usarlos en su propio sistema telefónico. No los use para imitar la voz de una persona real ni para hacerse pasar por alguien que no es.',
        },
        {
          kind: 'p',
          text: 'Podemos retirar contenido o suspender una cuenta si no nos queda más remedio: una orden legal, o contenido que incumple la sección anterior. Se lo diremos cuando pase, salvo que no se nos permita.',
        },
        {
          kind: 'p',
          text: 'Si nos envía una sugerencia o un informe de error, podemos usarlo para mejorar WaveKat sin deberle nada por ello.',
        },
      ],
    },
    {
      id: 'connected',
      heading: 'Servicios que usted conecta',
      body: [
        {
          kind: 'p',
          text: 'Puede conectar WaveKat con otros servicios: un CRM, un webhook suyo, un asistente de IA en su computadora. Nada está conectado si usted no lo conecta.',
        },
        {
          kind: 'p',
          text: 'En cuanto lo hace, lo que ese servicio haga con lo que recibe se rige por su acuerdo con ellos, no por este. Si una conexión manda una transcripción a algún sitio, esa transcripción queda fuera de nuestras manos, y desconectar corta el flujo pero no recupera lo que ya se fue.',
        },
      ],
    },
    {
      id: 'availability',
      heading: 'Cambios, y qué no prometemos sobre la disponibilidad',
      body: [
        {
          kind: 'p',
          text: 'WaveKat Voice está en beta pública. Las funciones llegan, cambian de forma y a veces se van. Nos esforzamos por no romper aquello de lo que usted depende, y lo contamos en la [página de novedades](/voice/changelog/) cuando cambia algo que se nota.',
        },
        {
          kind: 'p',
          text: 'La parte en la nube de WaveKat no tiene garantía de disponibilidad. No hay acuerdo de nivel de servicio, ni compensaciones, ni promesa de que la sincronización vaya a estar accesible en un momento dado. La aplicación está hecha para funcionar sin nuestros servidores, así que si la parte en la nube deja de funcionar, cambia o alguna vez desaparece, lo que está en su propia computadora se queda ahí y sigue funcionando.',
        },
      ],
    },
    {
      id: 'warranty',
      heading: 'Sin garantías',
      body: [
        {
          kind: 'p',
          text: 'WaveKat se ofrece «tal cual» y «según disponibilidad». No prometemos que vaya a funcionar sin interrupciones ni sin errores, ni que sirva para un fin concreto, ni prometemos que una llamada conecte, que se grabe o que una transcripción sea exacta.',
        },
        {
          kind: 'p',
          text: 'El reconocimiento de voz se equivoca, sobre todo con acentos, gente hablando a la vez y líneas malas. No trate una transcripción como acta de lo dicho si de ello depende algo importante.',
        },
        {
          kind: 'p',
          text: 'Algunos países dan a los consumidores garantías que no se pueden excluir: la Consumer Guarantees Act de Nueva Zelanda, las normas de consumo de la UE y el Reino Unido, y sus equivalentes. Nada de lo que hay aquí se las quita. Donde usted las tenga, se aplican por encima de esta sección y ganan. Si usa WaveKat para una empresa, acepta que esas garantías de consumo no se aplican, en la medida en que la ley se lo permita.',
        },
      ],
    },
    {
      id: 'liability',
      heading: 'Límites de nuestra responsabilidad',
      body: [
        {
          kind: 'p',
          text: 'En la medida en que la ley lo permita, WaveKat no responde por daños indirectos o derivados: negocio perdido, beneficios perdidos, datos perdidos, una llamada que no conectó o una grabación que necesitaba y no obtuvo.',
        },
        {
          kind: 'p',
          text: 'Cuando sí respondamos, lo máximo que puede recuperar de nosotros por todo lo que derive de este acuerdo es lo que nos haya pagado en los doce meses anteriores al hecho; y si nunca nos ha pagado nada, 100 NZD.',
        },
        {
          kind: 'p',
          text: 'Nada de esto limita lo que la ley no nos deja limitar: nuestro propio fraude, lesiones causadas por nuestra propia negligencia, o una garantía de consumo suya que no pueda excluirse.',
        },
        {
          kind: 'p',
          text: 'Si el uso que usted hace de WaveKat incumple estos términos o la ley y eso hace que otra persona nos reclame —por una llamada que hizo, alguien a quien grabó o contenido que compartió—, usted cubrirá lo que ese reclamo nos cueste, en la medida en que la ley de su país le permita aceptar eso. Le avisaremos del reclamo con prontitud y no lo resolveremos en su nombre sin consultarle.',
        },
      ],
    },
    {
      id: 'ending',
      heading: 'Terminar el acuerdo',
      body: [
        {
          kind: 'p',
          text: 'Puede parar cuando quiera: desinstale la aplicación, o borre su cuenta en Ajustes, donde se le muestra qué contiene la cuenta antes de confirmar. También puede escribirnos y lo hacemos nosotros.',
        },
        {
          kind: 'p',
          text: 'Podemos suspender o cerrar una cuenta que incumpla estos términos, o cuando la ley nos obligue. Salvo urgencia u orden legal, primero le diremos cuál es el problema y le daremos ocasión de arreglarlo.',
        },
        {
          kind: 'p',
          text: 'Cuando el acuerdo termina, termina con él su licencia para usar la aplicación y borramos lo que estuviera sincronizado con su cuenta. Todo lo que esté en su propia computadora se queda ahí hasta que usted lo quite. Las secciones sobre que su contenido es suyo, la falta de garantías, nuestra responsabilidad y la ley aplicable siguen vigentes después.',
        },
      ],
    },
    {
      id: 'changes',
      heading: 'Cambios en estos términos',
      body: [
        {
          kind: 'p',
          text: 'Cuando estos términos cambian, la fecha de arriba cambia con ellos, y la nueva versión se aplica desde entonces. Si un cambio afecta de forma relevante a sus derechos, lo diremos en la aplicación o en esta página. Seguir usando WaveKat después de un cambio significa aceptarlo; si no lo acepta, deje de usar WaveKat y borre su cuenta.',
        },
      ],
    },
    {
      id: 'law',
      heading: 'Ley aplicable y conflictos',
      body: [
        {
          kind: 'p',
          text: 'Este acuerdo se rige por la ley de Nueva Zelanda, y los tribunales neozelandeses son competentes para cualquier disputa sobre él. Si usted es consumidor en otro país, esto no le quita la protección de la ley de su país ni su derecho a reclamar donde vive.',
        },
        {
          kind: 'p',
          text: 'Si tiene una disputa con nosotros, escriba primero a [hello@wavekat.com](mailto:hello@wavekat.com) y déjenos intentar resolverla antes de dar cualquier otro paso.',
        },
        {
          kind: 'p',
          text: 'Estos términos son el acuerdo completo entre nosotros sobre WaveKat. Si un tribunal decide que una parte no vale, el resto sigue valiendo. Que no exijamos algo de inmediato no significa que renunciemos a ello. Usted no puede ceder este acuerdo a otra persona; nosotros sí podemos cederlo a una empresa que se haga cargo de WaveKat, y se lo diremos si lo hacemos.',
        },
      ],
    },
  ],
  faqHeading: 'Preguntas y respuestas',
  faqs: [
    {
      q: '¿Tengo que aceptar algo para usar WaveKat Voice?',
      a: 'Sí. WaveKat Voice le pide aceptar estos términos y confirmar que conoce la política de privacidad la primera vez que la abre, antes de configurar nada. No hace falta una cuenta de WaveKat —sin ella la aplicación funciona entera en su propia computadora— pero sí hace falta aceptar el acuerdo.',
    },
    {
      q: '¿WaveKat Voice puede llamar al 111, al 911 o a otros números de emergencia?',
      a: 'No. Dé por hecho que no puede comunicarse con los servicios de emergencia. Es software que corre en su computadora, no sabe su dirección, y una llamada de emergencia puede fallar o llegar al lugar equivocado. Tenga siempre a mano un móvil o una línea fija que sí pueda, y asegúrese de que cualquier otra persona que use la computadora lo sepa.',
    },
    {
      q: '¿Es legal que grabe mis llamadas con WaveKat Voice?',
      a: 'Depende de dónde esté usted y dónde esté la persona a la que llama, y es responsabilidad suya, no nuestra. En algunos sitios basta su consentimiento; en otros tienen que estar de acuerdo todos, y equivocarse puede ser delito. Si no está seguro, diga que está grabando, o apague la grabación en Ajustes.',
    },
    {
      q: '¿WaveKat es dueño de mis grabaciones, o las usa para entrenar modelos?',
      a: 'No a las dos cosas. Sus grabaciones, transcripciones, contactos y flujos de llamada son suyos, y no los usamos para entrenar modelos salvo que usted haya elegido explícitamente permitirlo. Si inicia sesión y deja activada la sincronización en la nube nos da permiso para almacenarlos y moverlos para que el servicio funcione, y ese permiso termina cuando borra el contenido o su cuenta.',
    },
    {
      q: '¿WaveKat Voice cuesta algo?',
      a: 'Hoy no. La aplicación es gratis, y Pro no cuesta nada durante el acceso anticipado: si lo pide en el sitio web se lo damos por un período indicado sin cargo, y no vamos a empezar a cobrar por un período ya dado. No hay ningún proceso de pago en WaveKat. Cuando Pro tenga un precio, lo verá antes de pagar nada, y esta página cambiará para decirlo.',
    },
    {
      q: '¿Qué pasa con mis datos si dejo de usar WaveKat?',
      a: 'Borre su cuenta en Ajustes y borramos lo que estuviera sincronizado con ella; la aplicación le muestra qué contiene la cuenta antes de confirmar. Lo que esté en su propia computadora se queda ahí hasta que lo quite, cosa que puede hacer desde la misma pantalla.',
    },
  ],
  contactHeading: 'Contacto',
  contactIntro:
    'Si algo de esta página no está claro, o cree que una cláusula está mal, escríbanos.',
};
