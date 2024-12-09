--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0
-- Dumped by pg_dump version 17.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: JUEGO; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."JUEGO" (
    game_description character varying NOT NULL,
    game_rate integer NOT NULL,
    game_genre character varying NOT NULL,
    game_name character varying NOT NULL,
    game_poster character varying,
    game_cost numeric(2,0)
);


ALTER TABLE public."JUEGO" OWNER TO postgres;

--
-- Name: KEY; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."KEY" (
    game_name character varying NOT NULL,
    key_owner character varying NOT NULL,
    game_key character varying
);


ALTER TABLE public."KEY" OWNER TO postgres;

--
-- Name: TRANSACCION; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TRANSACCION" (
    user_name character varying NOT NULL,
    "FECHA" date NOT NULL,
    game_name character varying,
    "ID" integer NOT NULL
);


ALTER TABLE public."TRANSACCION" OWNER TO postgres;

--
-- Name: TRANSACCION_ID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."TRANSACCION_ID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."TRANSACCION_ID_seq" OWNER TO postgres;

--
-- Name: TRANSACCION_ID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."TRANSACCION_ID_seq" OWNED BY public."TRANSACCION"."ID";


--
-- Name: USER; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."USER" (
    user_name character varying NOT NULL,
    user_password character varying NOT NULL,
    user_mail character varying NOT NULL,
    birth_date date NOT NULL
);


ALTER TABLE public."USER" OWNER TO postgres;

--
-- Name: TRANSACCION ID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TRANSACCION" ALTER COLUMN "ID" SET DEFAULT nextval('public."TRANSACCION_ID_seq"'::regclass);


--
-- Data for Name: JUEGO; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."JUEGO" (game_description, game_rate, game_genre, game_name, game_poster, game_cost) FROM stdin;
Explora un vasto mundo abierto lleno de aventuras y desafíos.	8	Adventure	Minecraft	https://www.nintendo.com/eu/media/images/10_share_images/games_15/nintendo_switch_4/2x1_NSwitch_Minecraft_image1600w.jpg	20
Construye y gestiona tu propio parque de atracciones en este simulador de construcción.	9	Simulation	SimCity 4	https://external-preview.redd.it/new-simcity-4-mod-gives-it-a-whole-new-look-21-years-later-v0-4Ego7WWJZQUyz2r8fSnqujx4qtTAQK4VWRvEXxFrxBw.jpg?width=1080&crop=smart&auto=webp&s=ac5ce857484cdb1251e29cf574b9b15019f2d296	20
Sobrevive a un apocalipsis zombi en un mundo abierto y lleno de acción.	8	Survival	The Walking Dead: A New Frontier	https://www.nintendo.com/eu/media/images/10_share_images/games_15/nintendo_switch_download_software_1/H2x1_NSwitchDS_TheWalkingDeadANewFrontier_image1600w.jpg	20
Embárcate en una aventura épica en un mundo de fantasía.	8	RPG	Divinity: Original Sin 2	https://cdn.cloudflare.steamstatic.com/steam/apps/435150/header.jpg	40
Sobrevive a hordas de zombis en este juego de acción y supervivencia.	7	Horror	World War Z	https://cdn.cloudflare.steamstatic.com/steam/apps/1238000/header.jpg	30
Compite en intensas batallas multijugador en este juego de disparos en primera persona.	8	Shooter	Rainbow Six Siege	https://cdn.cloudflare.steamstatic.com/steam/apps/359550/header.jpg	40
Explora un vasto mundo lleno de criaturas mágicas y misterios por resolver.	9	Adventure	Ori and the Will of the Wisps	https://cdn.cloudflare.steamstatic.com/steam/apps/1057090/header.jpg	40
Construye y gestiona tu propia granja en este simulador de vida rural.	8	Simulation	Harvest Moon: Light of Hope	https://cdn.cloudflare.steamstatic.com/steam/apps/1238000/header.jpg	30
Embárcate en una aventura épica en un mundo de ciencia ficción.	8	RPG	The Outer Worlds	https://cdn.cloudflare.steamstatic.com/steam/apps/578650/header.jpg	60
Sobrevive en un mundo post-apocalíptico lleno de peligros y desafíos.	7	Survival	State of Decay 2	https://cdn.cloudflare.steamstatic.com/steam/apps/1238000/header.jpg	30
Compite en emocionantes carreras de autos en este juego de simulación de carreras.	9	Racing	F1 2020	https://cdn.cloudflare.steamstatic.com/steam/apps/1080110/header.jpg	50
Embárcate en una aventura en un mundo abierto lleno de magia y criaturas fantásticas.	9	RPG	Dragon Age: Origins	https://cdn.cloudflare.steamstatic.com/steam/apps/17470/header.jpg	30
Explora un mundo de ciencia ficción en un juego de rol y acción en tercera persona.	8	RPG	Mass Effect 2	https://cdn.cloudflare.steamstatic.com/steam/apps/24980/header.jpg	25
Sobrevive en una isla llena de criaturas hostiles y misterios por resolver.	8	Survival	ARK: Survival Evolved	https://cdn.cloudflare.steamstatic.com/steam/apps/346110/header.jpg	40
Explora un vasto mundo abierto lleno de aventuras y desafíos.	9	Adventure	The Legend of Zelda: Breath of the Wild	https://cdn.cloudflare.steamstatic.com/steam/apps/729040/header.jpg	60
Conduce a través de paisajes impresionantes y compite en carreras emocionantes.	8	Racing	Forza Horizon 4	https://cdn.cloudflare.steamstatic.com/steam/apps/1293830/header.jpg	50
Únete a la batalla en el campo de batalla más grande del mundo.	7	Shooter	Battlefield V	https://cdn.cloudflare.steamstatic.com/steam/apps/1238810/header.jpg	30
Construye y gestiona tu propia ciudad en este simulador de construcción.	9	Simulation	Cities: Skylines	https://cdn.cloudflare.steamstatic.com/steam/apps/255710/header.jpg	20
Embárcate en una aventura épica en un mundo de fantasía.	8	RPG	The Witcher 3: Wild Hunt	https://cdn.cloudflare.steamstatic.com/steam/apps/292030/header.jpg	30
Sobrevive a hordas de zombis en este juego de acción y supervivencia.	7	Horror	Resident Evil 2	https://cdn.cloudflare.steamstatic.com/steam/apps/883710/header.jpg	40
Compite en intensas batallas multijugador en este juego de disparos en primera persona.	8	Shooter	Call of Duty: Modern Warfare	https://cdn.cloudflare.steamstatic.com/steam/apps/1938090/header.jpg	60
Explora un vasto mundo lleno de criaturas mágicas y misterios por resolver.	9	Adventure	Horizon Zero Dawn	https://cdn.cloudflare.steamstatic.com/steam/apps/1151640/header.jpg	50
Construye y gestiona tu propia granja en este simulador de vida rural.	8	Simulation	Stardew Valley	https://cdn.cloudflare.steamstatic.com/steam/apps/413150/header.jpg	15
Embárcate en una aventura épica en un mundo de ciencia ficción.	8	RPG	Mass Effect: Andromeda	https://cdn.cloudflare.steamstatic.com/steam/apps/1238000/header.jpg	20
Sobrevive en un mundo post-apocalíptico lleno de peligros y desafíos.	7	Survival	Fallout 4	https://cdn.cloudflare.steamstatic.com/steam/apps/377160/header.jpg	30
Compite en emocionantes carreras de autos en este juego de simulación de carreras.	9	Racing	Gran Turismo Sport	https://cdn.cloudflare.steamstatic.com/steam/apps/1238000/header.jpg	40
Explora un vasto mundo abierto lleno de aventuras y desafíos.	8	Adventure	Assassin\\s Creed Odyssey	https://cdn.cloudflare.steamstatic.com/steam/apps/812140/header.jpg	50
Construye y gestiona tu propio parque de atracciones en este simulador de construcción.	9	Simulation	Planet Coaster	https://cdn.cloudflare.steamstatic.com/steam/apps/493340/header.jpg	30
Embárcate en una aventura épica en un mundo de fantasía.	8	RPG	Final Fantasy XV	https://cdn.cloudflare.steamstatic.com/steam/apps/637650/header.jpg	40
Sobrevive a hordas de zombis en este juego de acción y supervivencia.	7	Horror	Dying Light	https://cdn.cloudflare.steamstatic.com/steam/apps/239140/header.jpg	30
Compite en intensas batallas multijugador en este juego de disparos en primera persona.	8	Shooter	Overwatch	https://cdn.cloudflare.steamstatic.com/steam/apps/1172470/header.jpg	40
Explora un vasto mundo lleno de criaturas mágicas y misterios por resolver.	9	Adventure	The Elder Scrolls V: Skyrim	https://cdn.cloudflare.steamstatic.com/steam/apps/72850/header.jpg	20
Construye y gestiona tu propia granja en este simulador de vida rural.	8	Simulation	Farming Simulator 19	https://cdn.cloudflare.steamstatic.com/steam/apps/787860/header.jpg	25
Embárcate en una aventura épica en un mundo de ciencia ficción.	8	RPG	Cyberpunk 2077	https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg	60
Sobrevive en un mundo post-apocalíptico lleno de peligros y desafíos.	7	Survival	Metro Exodus	https://cdn.cloudflare.steamstatic.com/steam/apps/412020/header.jpg	40
Compite en emocionantes carreras de autos en este juego de simulación de carreras.	9	Racing	Need for Speed Heat	https://cdn.cloudflare.steamstatic.com/steam/apps/1222680/header.jpg	50
Explora un vasto mundo abierto lleno de aventuras y desafíos.	8	Adventure	Red Dead Redemption 2	https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg	60
Construye y gestiona tu propio parque de atracciones en este simulador de construcción.	9	Simulation	RollerCoaster Tycoon 3	https://cdn.cloudflare.steamstatic.com/steam/apps/2700/header.jpg	20
Embárcate en una aventura épica en un mundo de fantasía.	8	RPG	Dragon Age: Inquisition	https://cdn.cloudflare.steamstatic.com/steam/apps/1238000/header.jpg	40
Sobrevive a hordas de zombis en este juego de acción y supervivencia.	7	Horror	The Last of Us Part II	https://cdn.cloudflare.steamstatic.com/steam/apps/1238000/header.jpg	60
Compite en intensas batallas multijugador en este juego de disparos en primera persona.	8	Shooter	Apex Legends	https://cdn.cloudflare.steamstatic.com/steam/apps/1172470/header.jpg	0
Explora un vasto mundo lleno de criaturas mágicas y misterios por resolver.	9	Adventure	The Legend of Zelda: Link\\s Awakening	https://cdn.cloudflare.steamstatic.com/steam/apps/1172470/header.jpg	50
Construye y gestiona tu propia granja en este simulador de vida rural.	8	Simulation	My Time at Portia	https://cdn.cloudflare.steamstatic.com/steam/apps/666140/header.jpg	30
Embárcate en una aventura épica en un mundo de ciencia ficción.	8	RPG	Star Wars Jedi: Fallen Order	https://cdn.cloudflare.steamstatic.com/steam/apps/1172380/header.jpg	40
Sobrevive en un mundo post-apocalíptico lleno de peligros y desafíos.	7	Survival	Days Gone	https://cdn.cloudflare.steamstatic.com/steam/apps/1238000/header.jpg	40
Compite en emocionantes carreras de autos en este juego de simulación de carreras.	9	Racing	Project CARS 2	https://cdn.cloudflare.steamstatic.com/steam/apps/378860/header.jpg	50
Explora un vasto mundo abierto lleno de aventuras y desafíos.	8	Adventure	Ghost of Tsushima	https://cdn.cloudflare.steamstatic.com/steam/apps/1172470/header.jpg	60
Construye y gestiona tu propio parque de atracciones en este simulador de construcción.	9	Simulation	Jurassic World Evolution	https://cdn.cloudflare.steamstatic.com/steam/apps/648350/header.jpg	50
\.


--
-- Data for Name: KEY; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."KEY" (game_name, key_owner, game_key) FROM stdin;
The Outer Worlds	daniel	9MLYMT7PHF
Ori and the Will of the Wisps	daniel	760Y8ZYIE3
Minecraft	JESUS	9E9VV6J4O9
Divinity: Original Sin 2	daniel	8IO8BJHTLO
Rainbow Six Siege	daniel	JWS4DQL3QO
\.


--
-- Data for Name: TRANSACCION; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."TRANSACCION" (user_name, "FECHA", game_name, "ID") FROM stdin;
daniel	2024-12-09	The Outer Worlds	1
daniel	2024-12-09	Ori and the Will of the Wisps	2
daniel	2024-12-09	Rainbow Six Siege	6
\.


--
-- Data for Name: USER; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."USER" (user_name, user_password, user_mail, birth_date) FROM stdin;
maria	maria	maria@gmail.com	2024-11-30
daniel	a	daniader23@gmail.com	2024-12-19
JESUS	123456	MONGUI@GMAIL.COM	2001-01-01
a	a	a@a.com	2024-12-12
marcos	marcos	marcos16vivas@gmail.com	2024-05-09
\.


--
-- Name: TRANSACCION_ID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."TRANSACCION_ID_seq"', 6, true);


--
-- Name: USER USER_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."USER"
    ADD CONSTRAINT "USER_pkey" PRIMARY KEY (user_name);


--
-- Name: JUEGO game_name; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."JUEGO"
    ADD CONSTRAINT game_name PRIMARY KEY (game_name);


--
-- Name: TRANSACCION fk_game_name; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TRANSACCION"
    ADD CONSTRAINT fk_game_name FOREIGN KEY (game_name) REFERENCES public."JUEGO"(game_name);


--
-- Name: KEY game_name; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."KEY"
    ADD CONSTRAINT game_name FOREIGN KEY (game_name) REFERENCES public."JUEGO"(game_name);


--
-- Name: KEY key_owner; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."KEY"
    ADD CONSTRAINT key_owner FOREIGN KEY (key_owner) REFERENCES public."USER"(user_name);


--
-- Name: TRANSACCION user_name; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TRANSACCION"
    ADD CONSTRAINT user_name FOREIGN KEY (user_name) REFERENCES public."USER"(user_name) NOT VALID;


--
-- PostgreSQL database dump complete
--

