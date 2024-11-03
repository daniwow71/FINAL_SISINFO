PGDMP      *             
    |            P_SIS_INFOR_1    17.0    17.0     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            �           1262    16388    P_SIS_INFOR_1    DATABASE     �   CREATE DATABASE "P_SIS_INFOR_1" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Spain.1252';
    DROP DATABASE "P_SIS_INFOR_1";
                     postgres    false            �            1259    16407    JUEGO    TABLE     �   CREATE TABLE public."JUEGO" (
    game_description character varying NOT NULL,
    game_rate integer NOT NULL,
    game_genre character varying NOT NULL,
    game_name character varying NOT NULL,
    game_poster character varying
);
    DROP TABLE public."JUEGO";
       public         heap r       postgres    false            �            1259    24597    KEY    TABLE     �   CREATE TABLE public."KEY" (
    game_key integer NOT NULL,
    game_name character varying NOT NULL,
    key_owmner character varying NOT NULL
);
    DROP TABLE public."KEY";
       public         heap r       postgres    false            �            1259    16400    TRANSACCION    TABLE     �   CREATE TABLE public."TRANSACCION" (
    user_name character varying NOT NULL,
    "ID" integer NOT NULL,
    "FECHA" date NOT NULL,
    "COSTE" integer NOT NULL
);
 !   DROP TABLE public."TRANSACCION";
       public         heap r       postgres    false            �            1259    16393    USER    TABLE     �   CREATE TABLE public."USER" (
    user_name character varying NOT NULL,
    user_password character varying NOT NULL,
    user_mail character varying NOT NULL,
    birth_date date NOT NULL
);
    DROP TABLE public."USER";
       public         heap r       postgres    false            �          0    16407    JUEGO 
   TABLE DATA           b   COPY public."JUEGO" (game_description, game_rate, game_genre, game_name, game_poster) FROM stdin;
    public               postgres    false    219   [       �          0    24597    KEY 
   TABLE DATA           @   COPY public."KEY" (game_key, game_name, key_owmner) FROM stdin;
    public               postgres    false    220   �       �          0    16400    TRANSACCION 
   TABLE DATA           J   COPY public."TRANSACCION" (user_name, "ID", "FECHA", "COSTE") FROM stdin;
    public               postgres    false    218   �       �          0    16393    USER 
   TABLE DATA           Q   COPY public."USER" (user_name, user_password, user_mail, birth_date) FROM stdin;
    public               postgres    false    217          3           2606    24603    KEY KEY_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."KEY"
    ADD CONSTRAINT "KEY_pkey" PRIMARY KEY (game_key);
 :   ALTER TABLE ONLY public."KEY" DROP CONSTRAINT "KEY_pkey";
       public                 postgres    false    220            /           2606    16406    TRANSACCION TRANSACCION_key 
   CONSTRAINT     _   ALTER TABLE ONLY public."TRANSACCION"
    ADD CONSTRAINT "TRANSACCION_key" PRIMARY KEY ("ID");
 I   ALTER TABLE ONLY public."TRANSACCION" DROP CONSTRAINT "TRANSACCION_key";
       public                 postgres    false    218            -           2606    16399    USER USER_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public."USER"
    ADD CONSTRAINT "USER_pkey" PRIMARY KEY (user_name);
 <   ALTER TABLE ONLY public."USER" DROP CONSTRAINT "USER_pkey";
       public                 postgres    false    217            1           2606    24596    JUEGO game_name 
   CONSTRAINT     V   ALTER TABLE ONLY public."JUEGO"
    ADD CONSTRAINT game_name PRIMARY KEY (game_name);
 ;   ALTER TABLE ONLY public."JUEGO" DROP CONSTRAINT game_name;
       public                 postgres    false    219            5           2606    24609    KEY game_name    FK CONSTRAINT     y   ALTER TABLE ONLY public."KEY"
    ADD CONSTRAINT game_name FOREIGN KEY (game_name) REFERENCES public."JUEGO"(game_name);
 9   ALTER TABLE ONLY public."KEY" DROP CONSTRAINT game_name;
       public               postgres    false    219    220    4657            6           2606    24604    KEY key_owner    FK CONSTRAINT     y   ALTER TABLE ONLY public."KEY"
    ADD CONSTRAINT key_owner FOREIGN KEY (key_owmner) REFERENCES public."USER"(user_name);
 9   ALTER TABLE ONLY public."KEY" DROP CONSTRAINT key_owner;
       public               postgres    false    220    4653    217            4           2606    24585    TRANSACCION user_name    FK CONSTRAINT     �   ALTER TABLE ONLY public."TRANSACCION"
    ADD CONSTRAINT user_name FOREIGN KEY (user_name) REFERENCES public."USER"(user_name) NOT VALID;
 A   ALTER TABLE ONLY public."TRANSACCION" DROP CONSTRAINT user_name;
       public               postgres    false    4653    218    217            �   a  x��Q�n�@}�����/�K��2䆊��JQ%4�f����ڴ��ЯȏumEQ�Zɚk�9g�j��.�a��痐�h���>���jyN'�Z���A��ྜ2R��@���Ap�)k�����Z�g��&�?H��8$9V���4��5V[(���H֑e���^ G�H���[[8�N�R�h��Ae��ȥVx���W���3��h=����vr˷�F��Z�:DI9!�r]N��e�&��MS;Tn��f��i�J���,H89-½�n�j����q�~'��g��N�LV_g���wUU�KƸPA��d��N�+��=����g��d�Yf+R\�,G��&0�RԼ�,���b��j�>����kz�X��
�s��SZ9�m�q��0��~?�c�}ៃ�A��wV��Εt'�0�\�u���2$>���<,�W�x�6���S�sTKf�`����9i�Q?��� ��>���x��4��b�#!�q�q��o]��IUp'���Q�K��f�{�:�ȉ�9�7�r��ԛLx��g�u�r�Z�p3�0��Yx������/{?ӌ����=�e:���t�x��M�>�G������v� �1(�      �      x������ � �      �      x������ � �      �   F   x�K�L�LI��LLI-22vH�M���K���4202�54�50����I$BYnbQf"'���P�؀+F��� X�"     