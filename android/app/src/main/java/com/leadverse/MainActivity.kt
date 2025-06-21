package com.crmsoftware

import android.os.Bundle
import androidx.core.app.ActivityCompat
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.facebook.react.modules.core.PermissionAwareActivity
import com.facebook.react.modules.core.PermissionListener

class MainActivity : ReactActivity(), PermissionAwareActivity {

    private var permissionListener: PermissionListener? = null

    /**
     * Returns the name of the main component registered from JavaScript. This is used to schedule
     * rendering of the component.
     */
    override fun getMainComponentName(): String = "crmSoftware"

    /**
     * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
     * which allows you to enable New Architecture with a single boolean flag [fabricEnabled]
     */
    override fun createReactActivityDelegate(): ReactActivityDelegate =
        DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

    /**
     * Called when the activity is created. Optionally handle initialization here.
     */
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // Additional initialization can go here if needed
    }

    /**
     * Implements PermissionAwareActivity to handle runtime permissions for react-native-permissions.
     * Requests permissions when called by the React Native module.
     */
    override fun requestPermissions(
        permissions: Array<String>,
        requestCode: Int,
        listener: PermissionListener?
    ) {
        permissionListener = listener
        ActivityCompat.requestPermissions(this, permissions, requestCode)
    }

    /**
     * Handles the result of permission requests and forwards it to the React Native module.
     */
    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<String>,
        grantResults: IntArray
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        permissionListener?.onRequestPermissionsResult(requestCode, permissions, grantResults)
    }
}