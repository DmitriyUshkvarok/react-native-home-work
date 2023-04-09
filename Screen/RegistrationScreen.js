import { StyleSheet, TextInput, View, ImageBackground, Text, TouchableOpacity } from "react-native";

const RegistrationScreen = () => {
    return (
        <ImageBackground style={styles.imageBg} source={require('../assets/images/nativeBackground.jpg')}>
            <View style={styles.form}>

                <Text style={styles.registrTitle}>Регистрация</Text>

                <View style={styles.registrInputWrapper}>
                    <TextInput style={[styles.inputLogRegistr]} placeholder="Логин" />
                    <TextInput style={[styles.inputLogRegistr]} placeholder="Адрес электронной почты" />
                    <TextInput style={[styles.inputLogRegistr]} placeholder="Пароль" />
                    {/* <Text style={styles.btnRegister}>Зарегистрироваться</Text> */}
                    <TouchableOpacity style={styles.btnRegister} >
                        <Text style={styles.btnTitle}>Зарегистрироваться</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnLogIn} >
                        <Text style={styles.btnTitleLogIn}>Уже есть аккаунт? Войти</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    imageBg: {
        backgroundColor: '#fff',
        flex: 1,
        resizeMode: "cover",
    },
    form: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingHorizontal: 16,
        paddingTop: 92,
        paddingBottom: 45,
        position: "relative",
        top: 310,
        left: 0,
        height: '100%',
    },
    registrTitle: {
        // fontFamily: "Medium",
        fontSize: 30,
        fontWeight: 500,
        lineHeight: 35,
        textAlign: "center",
        letterSpacing: 0.01,
        color: "#212121",
        marginBottom: 33,
    },
    registrInputWrapper: {
        flex: 1,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 45,
        gap: 16,
    },
    inputLogRegistr: {
        width: 345,
        height: 50,
        borderColor: '#E8E8E8',
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: '#F6F6F6',
        padding: 16,
    },
    btnRegister: {
        backgroundColor: "#FF6C00",
        borderRadius: 100,
        // fontFamily: "Regular",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        marginBottom: 16,
    },
    btnTitle: {
        color: '#FFFFFF',
        fontSize: 16,
        lineHeight: 19,
    },
    btnLogIn: {
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    btnTitleLogIn: {
        color: '#1B4371',
        fontFamily: 'Roboto',
        fontSize: 16,
        lineHeight: 19,
    },
});


export default RegistrationScreen;