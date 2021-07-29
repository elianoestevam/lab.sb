import { OnInit, AfterViewInit } from '@angular/core';
import { NbComponentStatus, NbGlobalPosition, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';

export abstract class PagesBase implements OnInit, AfterViewInit {
    usuario: any;
    loading = false;
    position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
    types: NbComponentStatus[] = [
        'primary',
        'success',
        'info',
        'warning',
        'danger',
    ];

    constructor(public toastrService: NbToastrService) {

    }

    ngOnInit() {

    }

    ngAfterViewInit() {

    }

    showToastError(title: string, error: any, destroyByClick: boolean, duration: number) {
        let body: string = "";
        if (error.error) {
            body = error.error.message;
        }
        this.showToast(this.types[4], title, body, destroyByClick, duration);
    }

    showToastMsgError(title: string, body: string, destroyByClick: boolean, duration: number) {
        this.showToast(this.types[4], title, body, destroyByClick, duration);
    }

    showToastSuccess(title: string, body: string, destroyByClick: boolean, duration: number) {
        this.showToast(this.types[1], title, body, destroyByClick, duration);
    }

    showToast(type: NbComponentStatus, title: string, body: string, destroyByClick: boolean, duration: number) {
        const config = {
            status: type,
            destroyByClick: destroyByClick,
            duration: duration,
            hasIcon: true,
            position: this.position,
            preventDuplicates: false,
        };
        const titleContent = title ? `${title}` : '';
        this.toastrService.show(
            body,
            `${titleContent}`,
            config);
    }
}