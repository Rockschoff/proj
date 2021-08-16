function RefreshToken(res){
    let refreshTiming = (res.tokenObj.expires_in || 3600 - 5*60)*1000;

    const token = async () => {
        const newAuthRes = await res.reloadAuthResponse();

        refreshTiming = (newAuthRes.expires_in || 3600 - 5*60)*1000;
        console.log("newAuthRes : " + newAuthRes);

        setTimeout(token , refreshTiming)
    }

    setTimeout(token , refreshTiming);
}

export default RefreshToken;