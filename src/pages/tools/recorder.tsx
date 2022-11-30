import React, { useEffect, useState } from 'react'
import Layout from '@/components/layout'
import Seo from "@/components/seo"
import "@/styles/pages/recorder.scss"

const RecorderPage = () => {

	useEffect(() => {
		checkDevices();
	}, []);

	const [useCamera, setUseCamera] = useState<Boolean>(false);
	const [hasCamera, setHasCamera] = useState<Boolean>(false);
	const [hasMicrophone, setHasMicrophone] = useState<Boolean>(false);
	const [cameraIniting, setCameraIniting] = useState<Boolean>(false);

	const checkDevices = () => {
		triggerMediaChecked();
		// check input devices
		navigator.mediaDevices.enumerateDevices().then(devices => {
			devices.forEach(device => {
				if (device.kind === "videoinput") setHasCamera(true);
				if (device.kind === "audioinput") setHasMicrophone(true);
			})
		})
		console.log(hasCamera, hasMicrophone)
	}
	const clickCamera = () => {
		if (hasCamera) {
			if (cameraIniting) return;
			setUseCamera(!useCamera);
			triggerMediaChecked();
			// changeUseCamera();
		}
		//  else {
		// 	$("#noCameraTip").css('display', 'flex');
		// }
	}
	const triggerMediaChecked = () => {
		// if (useCamera) {
		// 	$("#trigger-camera").addClass('active');
		// 	$("#chooseCamera").addClass('active');
		// } else {
		// 	$("#trigger-camera").removeClass('active');
		// 	$("#chooseCamera").removeClass('active');
		// }
	}


	return (
		<Layout
			headerClassName={'whiteHeader'}
			fullScreenContent={false}
		>
			<Seo title="Online Recorder" description="Online Screen Recorder" author="Pisco" />
			<div className="screen-recorder-container">
				<div className="wrapper">
					<div className="title" id="recordOnlineTitle">免费在线录屏</div>
					<div className="record-settings" id="recordSetting">
						<div className="record-medias">
							<div className="media-item screen active" id="trigger-screen">
								<div className="item-img"></div>
								<div className="item-name">屏幕</div>
								<div className="checked"></div>
							</div>
							<div className="media-item camera" onClick={clickCamera}>
								<div className="item-img"></div>
								<div className="item-name">摄像头</div>
								<div className="checked"></div>
							</div>
							<div className="media-item sound" id="trigger-sound">
								<div className="item-img"></div>
								<div className="item-name">系统声音</div>
								<div className="checked"></div>
							</div>
							<div className="media-item mic" id="trigger-microphone">
								<div className="item-img"></div>
								<div className="item-name">麦克风</div>
								<div className="checked"></div>
							</div>
						</div>
						<button className="record-btn record-start btn-common" id="start-record"><div className="start-icon"></div>开始录制</button>
					</div>
					<div className="record-recording" id="recordCounting">
						<div className="back-to-setting" id="goBackTitle">返回设置</div>
						<div className="recording-block">
							<div className="recording-left">
								<div className="recording-img">正在录制中...</div>
								<div className="recording-right">
									<div className="count-down-num" id="recordedTime">00:00:00</div>
									<div className="record-control-btns">
										<div className="pause-or-resume">
											<button className="record-btn record-pause" disabled id="pause-record">
											</button>
											<div className="pause-resume-word pause">暂停录制</div>
											<div className="pause-resume-word resume">恢复录制</div>
										</div>
										<div className="end-record">
											<button className="record-btn record-end" disabled id="stop-record">
											</button>
											<div className="pause-resume-word">停止录制</div>
										</div>
									</div>
								</div>
							</div>

							<div className="choosed-medias">
								<div className="item-camera" id="chooseCamera"></div>
								<div className="item-audio" id="chooseAudio"></div>
								<div className="item-mic" id="chooseMic"></div>
							</div>
						</div>
					</div>
					<div className="record-preview" id="recordPreview">
						<div className="back-to-setting" id="recordNewTitle">开始新的录制</div>
						<div className="preivew-record-video-box">
							<video id="preview-video" playsInline preload="preload"></video>
						</div>
						<div className="deal-video">
							<div className="get-record-video">
								<div className="download-record-video btn-common" id="downloadRecordVideo"><div className="down-icon"></div> 保存到本地</div>
							</div>
						</div>
					</div>
				</div>
				<video id="camera-video" playsInline autoPlay loop></video>
				<div id="goBackDialog" className="go-back-dialog tip-dialog-common">
					<div className="go-back-content dialog-content-common">
						<div className="go-back-icon"></div>
						<div className="go-back-title">当前正在录制中，返回将停止录制，且录制内容不会保存</div>
						<div className="go-back-btns">
							<div className="go-back-btn confirm-go-back btn-common" id="confirmBack">停止录制</div>
							<div className="go-back-btn cancel-go-back btn-common" id="cancelBack">继续录制</div>
						</div>
					</div>
				</div>
				<div className="no-camera-tip no-device-tip tip-dialog-common" id="noCameraTip">
					<div className="no-device-content dialog-content-common">
						<div className="no-device-icon"></div>
						<div className="no-device-title">未识别到系统摄像头设备，无法录制摄像头画面</div>
						<div className="sure-btn btn-common" id="closeCameraTip">确定</div>
					</div>
				</div>
				<div className="no-mic-tip no-device-tip tip-dialog-common" id="noMicTip">
					<div className="no-device-content dialog-content-common">
						<div className="no-device-icon"></div>
						<div className="no-device-title">未识别到系统声音输入设备，无法使用麦克风录制声音</div>
						<div className="sure-btn btn-common" id="closeMicTip">确定</div>
					</div>
				</div>
				<div className="get-app-dialog tip-dialog-common" id="getAppTip">
					<div className="get-app-content dialog-content-common">
						<div className="close" id="closeGetAppDialogIcon"></div>
						<div className="app-tip-img"></div>
						<div className="app-tip-content" id="macAudioNotSupport">Mac系统暂不支持网页录制系统声音</div>
						<div className="app-tip-content" id="noDisplayMedia">您当前浏览器不支持在线录屏，建议更换Chrome浏览器</div>
					</div>
				</div>
				<div className="not-allowed-tip tip-dialog-common" id="notAllowedTip">
					<div className="not-allowed-content dialog-content-common">
						<div className="not-allowed-title">未获取到系统权限，可在导航栏打开对应权限</div>
						<div className="not-allowed-img">
							<div className="click-here-plz">点击此处授权呀:)</div>
						</div>
						<div className="just-chrome">图示以Chrome浏览器为例</div>
						<div className="btn-common for-sure" id="hideNotAllowedTip">确定</div>
					</div>
				</div>
				<div className="light-top-tip">
					<div className="tip-img"></div>
					<div className="tip-word">没有开启屏幕录制权限，请确定后重试！</div>
				</div>
				<div className="tip-dialog-common count-down-dialog" id="countdownBox">
					<div className="count-down">
						<div className="count-circle"></div>
						<div className="countdown-number" id="countdownNum">3</div>
					</div>
				</div>
			</div>
		</Layout>

	)
}

export default RecorderPage