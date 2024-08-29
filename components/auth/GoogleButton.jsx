import { GoogleSigninButton } from '@react-native-google-signin/google-signin';

const GoogleButton = () => {
  return <GoogleSigninButton
  size={GoogleSigninButton.Size.Wide}
  color={GoogleSigninButton.Color.Dark}
  onPress={() => {
    console.log("clicked")
  }}
  disabled={isInProgress}
/>;
};

export default GoogleButton;
