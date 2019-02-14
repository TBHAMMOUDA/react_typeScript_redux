import * as React from 'react'
import * as Moment from 'moment'
import { connect } from 'react-redux'

import FileService from '../../../services/files'
import FileActions from '../../../actions/files'

import './style.scss'
import Icon from '../../Icon'
import translate from '../../../translations'

declare var qq

interface IState { }
interface IPropos {
    dispatch: any
    files: any
    basePath: string
    row?: boolean
}

class CardUpload extends React.Component<IPropos, IState> {
    componentDidMount() {
        let dropArea = document.getElementById('upload-box')
        this.makeDroppable(dropArea, this.handleUpload)
    }

    makeDroppable(element, callback) {
        const self = this
        let input: any = document.getElementById('upload-box-input')

        input.addEventListener('change', triggerCallback)

        element.addEventListener('dragover', function (e) {
            e.preventDefault()
            e.stopPropagation()
            element.classList.add('dragover')
        })

        element.addEventListener('dragleave', function (e) {
            e.preventDefault()
            e.stopPropagation()
            element.classList.remove('dragover')
        })

        element.addEventListener('drop', function (e) {
            e.preventDefault()
            e.stopPropagation()
            element.classList.remove('dragover')
            triggerCallback(e)
        })

        element.addEventListener('click', function () {
            input.value = null
            input.click()
        })

        function triggerCallback(e) {
            let files

            if (e.dataTransfer) {
                files = e.dataTransfer.files
            } else if (e.target) {
                files = e.target.files
            }

            callback.call(self, files)
        }
    }

    toggleExplorer() {
        let uploadInput: any = document.getElementById('upload-box-input')

        uploadInput.value = null
        uploadInput.click()
    }

    handleUpload(files) {
        let blobs = []

        const self = this
        const uploadData = {
            progress: 0,
            speed: 0,
            timeLeft: 0,
            path: self.props.basePath,
            filename: files[0].name
        }

        document.dispatchEvent(new CustomEvent('createUpload', { detail: uploadData }))

        function uploadChunk(blob, fileName, total: number, count: number, size: number) {
            return new Promise((resolve, reject) => {
                let xhr = new XMLHttpRequest()
                let started_at = new Date()

                xhr.onreadystatechange = async function (e) {
                    if (xhr.readyState === 4) {
                        if (count === -1) {
                            let result: any = await FileService.CheckFile(
                                localStorage.getItem('rushtera_user_email'),
                                self.props.basePath === '/other projects' ? '/' : self.props.basePath,
                                fileName,
                                String(size)
                            )

                            self.props.dispatch(FileActions.Delete(fileName))
                            self.props.dispatch(FileActions.Create(result.data.file))
                            document.dispatchEvent(new CustomEvent('deleteUpload', { detail: uploadData }))
                        }

                        resolve()
                    }
                }

                xhr.upload.onprogress = function (e) {
                    let progressValue = total === 1 ? e.loaded * 100 / e.total : (((count - 1) * 50 * 1024 * 1024) + e.loaded) * 100 / size

                    let seconds_elapsed = (new Date().getTime() - started_at.getTime()) / 1000
                    let bytes_per_second = seconds_elapsed ? e.loaded / seconds_elapsed : 0
                    let remaining_bytes = size - e.loaded
                    let seconds_remaining = seconds_elapsed ? remaining_bytes / bytes_per_second : -1

                    uploadData.progress = Number(progressValue.toFixed(0))
                    uploadData.speed = Number(bytes_per_second.toFixed(0))
                    uploadData.timeLeft = Number(seconds_remaining.toFixed(0))

                    document.dispatchEvent(new CustomEvent('updateUpload', { detail: uploadData }))
                }

                xhr.open('POST', 'http://api.rushtera.com/public/index.php/api/upload', true);

                let formData = new FormData();

                formData.append('username', localStorage.getItem('rushtera_user_email'));
                formData.append('file', blob);
                formData.append('file_name', fileName);
                formData.append('path', self.props.basePath === '/other projects' ? '/' : self.props.basePath);
                formData.append('chunkNumber', String(count === -1 ? total - 1 : count - 1));
                formData.append('totalNumChunks', String(total));

                xhr.send(formData);
            })
        };

        function uploadSubmit() {
            let fileInputs = files[0]
            sliceFilesToFragments(fileInputs);
        };

        async function sliceFilesToFragments(file) {
            let count = 0;
            let bytes_per_chunk = 50 * 1024 * 1024;
            let start = 0;
            let end = bytes_per_chunk;
            let size = file.size;

            while (start < size) {
                blobs.push(file.slice(start, end));
                start = end;
                end = start + bytes_per_chunk;
            }

            let blob
            let blobArray = blobs.slice();
            let total = blobs.length;

            while (blob = blobs.shift()) {
                count++;

                if (blobArray.length === count) { count = -1; }

                await uploadChunk(blob, file.name, total, count, size);
            }
        }

        uploadSubmit()
    }

    render() {
        const { row } = this.props

        if (row) {
            return <tr className='card-upload-tr' id='upload-box'>
                <td colSpan={7}>
                    <form id='upload-form'>
                        <input type='file' id='upload-box-input' multiple hidden />
                    </form>

                    <div className='card-upload-row'>
                        <Icon name='cloud-upload' color='primary' />
                        {translate('DROP_SELECT_FILES')}
                    </div>
                </td>
            </tr>
        } else {
            return <div onClick={this.toggleExplorer} className='card card-upload' id='upload-box'>
                <div className='card-upload-content'>
                    <form id='upload-form'>
                        <input type='file' id='upload-box-input' multiple hidden />
                    </form>
                    <Icon name='cloud-upload' color='primary' />
                    {translate('DROP_SELECT_FILES')}
                </div>
            </div>
        }
    }
}

const mapStateToProps = (state) => {
    return {
        files: state.files
    }
}

export default connect(mapStateToProps)(CardUpload)