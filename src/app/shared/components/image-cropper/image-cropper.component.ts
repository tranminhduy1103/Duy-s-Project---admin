import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { APIResponseModel } from 'app/shared/models/response.model';
import { AttachmentService } from 'app/shared/services/attachment.service';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { Observable, Subscription } from 'rxjs';

@Component({
    selector: 'app-image-cropper',
    templateUrl: './image-cropper.component.html',
})
export class ImageCropperComponent implements OnInit {
    @Input() recordId: any;
    @Input() type: any;
    @Input() fileName: any;
    @Input() events: Observable<void>;
    @Output() saveComplete = new EventEmitter<string>();
    imageChangedEvent: any = '';
    croppedImage: any = '';
    fileChange: boolean = false;
    private eventsSubscription: Subscription;
    constructor(private attachmentService: AttachmentService) { }

    ngOnInit(): void {
        this.getImage();
        this.eventsSubscription = this.events.subscribe(() => this.saveImage());
    }
    getImage(): void {
        if (this.recordId && this.type) {
            this.attachmentService
                .getByRecordId(this.recordId, this.type)
                .subscribe((res: APIResponseModel) => {
                    if (res && res.success) {
                        this.croppedImage = `data:image/jpeg;base64,${res.data.fileContent}`;
                    }
                });
        }
    }
    saveImage(): void {
        if (this.fileChange) {
            this.attachmentService
                .createByBase64(this.croppedImage, this.recordId, this.type, this.fileName)
                .subscribe(
                    (res) => res.success && this.saveComplete.emit('Done')
                );
        } else {
            this.saveComplete.emit('Done');
        }
    }
    fileChangeEvent(event: any): void {
        this.imageChangedEvent = event;
        this.fileChange = true;
    }
    imageCropped(event: ImageCroppedEvent): void {
        this.croppedImage = event.base64;
    }
    imageLoaded(image: LoadedImage): void {
        // show cropper
    }
    cropperReady(): void {
        // cropper ready
    }
    loadImageFailed(): void {
        // show message
    }
}
